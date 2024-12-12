import { Box, Divider, Typography } from "@mui/material";
import "./App.css";
import Clock from "./components/Clock";
import CustomButton, { ButtonVariant } from "./components/CustomButton";
import { useEffect, useRef, useState } from "react";
import CustomInput, { TextFieldVariant } from "./components/CustomInput";
import { debounce } from "./Config/debouce";

interface IData {
  name: string;
  description: string;
}

const dataList: IData[] = [
  { name: "Alice", description: "A passionate software engineer." },
  { name: "Bob", description: "Loves solving complex algorithms and puzzles." },
  {
    name: "Charlie",
    description: "A web developer focused on creating beautiful designs.",
  },
  {
    name: "Diana",
    description: "An experienced backend engineer specialized in databases.",
  },
  {
    name: "Eve",
    description: "Enthusiastic about cybersecurity and ethical hacking.",
  },
];

const STEP = 1;
const ZERO = 0;
const MAX = 60;
const DELAY = 1000;

function App() {
  // filter
  const [filter, setFilter] = useState<string>("");
  const [data, setData] = useState<IData[]>([]);

  // dong ho
  const secondsRef = useRef(0);
  const minutesRef = useRef(0);
  const hoursRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [, forceUpdate] = useState(0);
  
  const formatTime = (value: number) => value.toString().padStart(2, "0");
  
  useEffect(() => {
    let interval: any = null;
  
    if (isRunning) {
      interval = setInterval(() => {
        secondsRef.current += STEP;
  
        if (secondsRef.current >= MAX) {
          secondsRef.current = ZERO;
          minutesRef.current += STEP;
        }
  
        if (minutesRef.current >= MAX) {
          minutesRef.current = ZERO;
          hoursRef.current += STEP;
        }
  
        forceUpdate((prev) => prev + 1);
      }, DELAY);
    } else if (interval) {
      clearInterval(interval);
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);
  
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    secondsRef.current = ZERO;
    minutesRef.current = ZERO;
    hoursRef.current = ZERO;
    forceUpdate((prev) => prev + 1);
  };

  const reqApi = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setFilter(inputValue);

    const filterData = dataList.filter((item) =>
      item.name.toLowerCase().trim().includes(inputValue)
    );
    setData(filterData);
  }, DELAY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reqApi(e);
  };

  return (
    <>
      <Clock hours={formatTime(hoursRef.current)} second={formatTime(secondsRef.current)} minues={formatTime(minutesRef.current)} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        gap={2}
      >
        <CustomButton
          typeButton={ButtonVariant.CONTAINED}
          name={"Bắt đầu"}
          isFullWidth={false}
          onClick={handleStart}
          disabled={isRunning}
        />
        <CustomButton
          typeButton={ButtonVariant.CONTAINED}
          name={"Tạm dừng"}
          isFullWidth={false}
          onClick={handleStop}
          disabled={!isRunning}
        />
        <CustomButton
          typeButton={ButtonVariant.CONTAINED}
          name={"Reset"}
          isFullWidth={false}
          onClick={handleReset}
          // disabled={!isRunning}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mt: 5,
          position: "relative",
        }}
      >
        <CustomInput
          label="Nhập giá trị tìm kiếm"
          variantInput={TextFieldVariant.OUTLINED}
          name="filter"
          onChange={handleChange}
        />

        <Box>
          {filter !== "" ? (
            data.length !== 0 ? (
              data.map((item) => (
                <div key={item.name}>
                  <Typography variant="body1" fontWeight={500} paddingY={2}>
                    {item.name} : {item.description}
                  </Typography>
                  <Divider sx={{ border: "2px solid #DEE2E6" }} />
                </div>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ color: "red", mt: 5 }}
                fontWeight={600}
              >
                Không tìm thấy sản phẩm nào
              </Typography>
            )
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
