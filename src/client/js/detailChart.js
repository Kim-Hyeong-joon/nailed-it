import { Chart } from "chart.js";
const detailChartSpan = document.querySelector(".detail-chart > span");
export let detailChart;
export const detailChartDestroy = () => {
  detailChart.clear();
  detailChart.destroy();
  detailChart = null;
};

let achieveNumber;
let totalNumber;
let achieveChart;
const achievePercent = () => (achieveNumber / totalNumber) * 100;

export const paintDetailsChart = (disabledArray, detailArray) => {
  const ctx = document.getElementById("detailCanvas");
  achieveNumber = disabledArray.filter((element) => element === true).length;
  totalNumber = detailArray.filter((element) => element !== "").length;
  achieveChart = (achieveNumber / totalNumber) * 100;
  if (achieveChart) {
    detailChartSpan.innerText = `${achieveChart}%`;
  } else {
    detailChartSpan.innerText = "0%";
    achieveChart = 0;
  }
  detailChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["해낸 일", "해낼 일"],
      datasets: [
        {
          label: "Nailed It",
          data: [parseInt(achieveChart), 100 - parseInt(achieveChart)],
          backgroundColor: ["green", "teal"],
          borderWidth: 0.5,
          borderColor: "black",
        },
      ],
    },
    options: {
      title: { display: true, text: "Nailed It!", fontsize: 20 },
      legend: { display: true, position: "bottom" },
      tooltips: {
        enabled: false,
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 20,
          bottom: 0,
        },
      },
      animation: {
        duration: 1500,
      },
    },
  });
};

export const chartUpdate = (detail) => {
  if (detail.disabled) {
    achieveNumber += 1;
  } else {
    achieveNumber -= 1;
  }

  achieveChart = achievePercent(achieveNumber);
  if (achieveChart && achieveChart !== Infinity) {
    detailChartSpan.innerText = `${achieveChart}%`;
  }

  detailChart.data.datasets[0].data[0] = parseInt(achieveChart);
  detailChart.data.datasets[0].data[1] = 100 - parseInt(achieveChart);

  detailChart.update();
};

// total todo가 바뀌었을 때 (todo submit후, fetch가 완료 된 후 발생함)
export const updateTotalDetails = (details) => {
  totalNumber = details.filter((element) => element !== "").length;

  achieveChart = achievePercent();

  if (Boolean(achieveChart)) {
    detailChartSpan.innerText = `${achieveChart}%`;
  } else {
    detailChartSpan.innerText = "0%";
  }
  detailChart.data.datasets[0].data[0] = parseInt(achieveChart);
  detailChart.data.datasets[0].data[1] = 100 - parseInt(achieveChart);

  detailChart.update();
};
