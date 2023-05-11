import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { months } from "../../utils/constants";

// function getOption() {
//   return {
//     // title: {
//     //   text: "Waste Materials",
//     // },
//     tooltip: {},
//     legend: {
//       data: [
//         "Can",
//         "Pet Bottles",
//         "Rubber",
//         "Metal",
//         "Carton",
//         "Tetra Pack",
//         "Sachet",
//         "Wood",
//         "Tyre",
//       ],
//     },

//     xAxis: {
//       data: [
//         "Jan 2022",
//         "Feb 2022",
//         "Mar 2022",
//         "Apr 2022",
//         "May 2022",
//         "Jun 2022",
//       ],
//     },
//     yAxis: {},
//     series: [
//       {
//         name: "Can",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#CDDCCD",
//         },
//       },
//       {
//         name: "Pet Bottles",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#FCDDEC",
//         },
//       },
//       {
//         name: "Rubber",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#FCF3DD",
//         },
//       },
//       {
//         name: "Metal",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#DEDDFC",
//         },
//       },
//       {
//         name: "Carton",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#DDFCF5",
//         },
//       },
//       {
//         name: "Tetra Pack",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#FCDDDD",
//         },
//       },
//       {
//         name: "Sachet",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#DDEDFC",
//         },
//       },
//       {
//         name: "Wood",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#E5FCDD",
//         },
//       },
//       {
//         name: "Tyre",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20],
//         itemStyle: {
//           color: "#FCDDDD",
//         },
//       },
//     ],
//   };
// }

function BarChart({ data }) {
  const [num, setNum] = useState(0);
  const [modData, setModData] = useState([]);
  function addByClickBar(params) {
    setNum(num + 1);
  }
  const onEvents = {
    click: addByClickBar,
  };

  const colorPicker = () => {
    var randomArray = [
      "#CDDCCD",
      "#FCDDEC",
      "#FCF3DD",
      "#DDFCF5",
      "#FCDDDD",
      "#DDEDFC",
      "#E5FCDD",
    ];

    var item = randomArray[Math.floor(Math.random() * randomArray.length)];

    return item;
  };

  useEffect(() => {
    if (data) {
      const dataMap = data?.map((d) => d.items.map((item) => item));

      const mergedData = [].concat.apply([], dataMap);

      var output = mergedData.reduce(function (o, cur) {
        // Get the index of the key-value pair.
        var occurs = o.reduce(function (n, item, i) {
          return item.name == cur.cat ? i : n;
        }, -1);

        // If the name is found,
        if (occurs >= 0) {
          // append the current value to its list of values.
          o[occurs].data = o[occurs].data.concat(cur.count);

          // Otherwise,
        } else {
          // add the current item to o (but make sure the value is an array).
          var obj = {
            name: cur.cat,
            data: [cur.weight],
            type: "bar",
            itemStyle: {
              color: colorPicker(),
            },
          };
          o = o.concat([obj]);
        }

        return o;
      }, []);
      setModData(output);
    }
  }, [data]);

  function getOption() {
    return {
      tooltip: {},
      legend: {
        data: data[0]?.items?.map((dItem) => dItem.cat),
      },

      xAxis: {
        data: data?.map((d) => {
          return months[d.month - 1].text;
        }),
      },
      yAxis: {
        name: "waste measurement (kg)",
      },
      series: modData,
    };
  }

  return (
    <div>
      <ReactEcharts option={data && getOption()} onEvents={onEvents} />
    </div>
  );
}

export default BarChart;
// ReactDOM.render(<TestChart />, document.getElementById("container"));
