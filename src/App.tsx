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

function App() {
  // filter
  const [filter, setFilter] = useState<string>('');
  const [data, setData] = useState<IData[]>([]);

  const secondsRef = useRef<number>(0);
  const minutesRef = useRef<number>(0);
  const hoursRef = useRef<number>(0);

  // Sử dụng useState để cập nhật giá trị hiển thị trên UI
  const [second, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (isRunning) {
      interval = setInterval(() => {
        secondsRef.current += 1;
        setSeconds(secondsRef.current);

        if (secondsRef.current >= 60) {
          secondsRef.current = 0;
          minutesRef.current += 1;
          setMinutes(minutesRef.current);
        }

        if (minutesRef.current >= 60) {
          minutesRef.current = 0;
          hoursRef.current += 1;
          setHours(hoursRef.current);
        }
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]); 

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const reqApi = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setFilter(inputValue);

    const filterData = dataList.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );
    setData(filterData);
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reqApi(e);
  };

  return (
    <>
      <Clock hours={hours} second={second} minues={minutes} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomButton
          typeButton={ButtonVariant.CONTAINED}
          name={"Bắt đầu"}
          isFullWidth={false}
          onClick={handleStart}
        />
        <CustomButton
          typeButton={ButtonVariant.CONTAINED}
          name={"Tạm dừng"}
          isFullWidth={false}
          onClick={handleStop}
        />
        <CustomButton
          typeButton={ButtonVariant.CONTAINED}
          name={"Reset"}
          isFullWidth={false}
          onClick={handleReset}
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
          {data.length !== 0 ? (
            data.slice(0, 4).map((item) => (
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
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;

