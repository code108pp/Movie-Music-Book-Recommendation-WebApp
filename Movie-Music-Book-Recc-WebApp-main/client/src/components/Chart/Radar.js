import React from "react";
import axios from 'axios';
import {useState,useEffect,useRef} from 'react'
import { ResponsiveRadar } from "@nivo/radar";

function Radar(){

    const id = useRef(null)

    useEffect(()=>{
      
    },[])

    const waitBeforeShow = 5050

    const [statData,setStatData] = useState()
    const [isShown, setIsShown] = useState(false);

    

    useEffect(() => {
      const changeId = async () => {
        const Id = JSON.parse(localStorage.getItem("profile")).profile.id;
        console.log(Id);
        id.current = Id;
        console.log("id", id);
      };
      changeId();
      console.log("outside func", id.current);

      const getData = async () => {
        const result = await axios.post("http://localhost:3010/userStat", {
          userId: id.current,
        });
        // console.log(result)
        console.log("api called");
        setStatData(result.data.stat);
      };
      getData();

      const timer = setTimeout(() => {
        setIsShown(true);
      }, waitBeforeShow);

      return () => clearTimeout(timer);
    }, [waitBeforeShow]);
   
    return isShown ? <>
        <div
          className="radar"
          style={{
            height: "600px",
            width: "600px",
            margin: "auto",
          }}
        >
          {console.log("inside component", statData)}
          <ResponsiveRadar
            data={statData}
            keys={["count"]}
            indexBy="name"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: "color" }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            colors={{ scheme: "nivo" }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </> : null

    
   
}

export default Radar

