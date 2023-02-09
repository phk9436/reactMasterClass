import React from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "atoms/atoms";

function TodoList() {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [hour, setHour] = useRecoilState(hourSelector);

  const onMinutesChange = (e:React.FormEvent<HTMLInputElement>) => {
    setMinute(Number(e.currentTarget.value));
  }
  const onHoursChange = (e:React.FormEvent<HTMLInputElement>) => {
    setHour(Number(e.currentTarget.value));
  }
  return (
    <div>
      <input type="number" name="" id="" placeholder="Minutes" value={minute} onChange={onMinutesChange}/>
      <input type="number" name="" id="" placeholder="Hours" value={hour} onChange={onHoursChange}/>
    </div>
  );
}

export default TodoList;
