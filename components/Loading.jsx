import {CircularProgress} from "@nextui-org/react";

export default function Loading(){

  return (
    <div className="w-full h-full absolute top-0 flex justify-center items-center left-0">
      <CircularProgress classNames={{
            svg: "w-20 h-20",
            label: 'text-xl mt-3'
          }} label="جارى التحميل .." />
    </div>
  )
}