let achieveNumber;
let totalNumber;
let achieveChart;
const achievePercent = () => (achieveNumber / totalNumber) * 100;

export const paintDetailsChart = (disabledArray, detailArray) => {
  const totalChart = document.createElement("div");
  totalChart.className = "detail-chart__total-chart";
  const statusChart = document.createElement("div");
  statusChart.className = "detail-chart__status-chart";
  const statusText = document.createElement("span");
  statusText.innerText = `${Math.ceil(achieveChart)}%`;
  const detailChart = document.querySelector(".detail-chart");

  achieveNumber = disabledArray.filter((element) => element === true).length;
  totalNumber = detailArray.filter((element) => element !== "").length;
  achieveChart = Math.ceil((achieveNumber / totalNumber) * 100);
  if (achieveChart) {
    statusText.innerText = `${achieveChart}%`;
    statusChart.style.width = `${achieveChart}%`;
  } else {
    statusText.innerText = "0%";
    achieveChart = 0;
    statusText.style.opacity = "0";
  }

  statusChart.appendChild(statusText);
  totalChart.appendChild(statusChart);
  detailChart.appendChild(totalChart);
};

export const chartUpdate = (detail) => {
  if (detail.disabled) {
    achieveNumber += 1;
  } else {
    achieveNumber -= 1;
  }

  achieveChart = Math.ceil(achievePercent(achieveNumber));
  const statusChart = document.querySelector(".detail-chart__status-chart");
  statusChart.style.width = `${achieveChart}%`;
  statusChart.style.opacity = "1";
  const statusText = document.querySelector(
    ".detail-chart__status-chart > span"
  );
  if (achieveChart && achieveChart !== Infinity) {
    statusText.innerText = `${achieveChart}%`;
    statusText.style.opacity = "1";
  } else if (achieveChart === 0) {
    statusText.style.opacity = "0";
  }
};

// total todo가 바뀌었을 때 (todo submit후, fetch가 완료 된 후 발생함)
export const updateTotalDetails = (details) => {
  totalNumber = details.filter((element) => element !== "").length;

  achieveChart = Math.ceil(achievePercent());
  const statusChart = document.querySelector(".detail-chart__status-chart");
  statusChart.style.width = `${achieveChart}%`;
  const statusText = document.querySelector(
    ".detail-chart__status-chart > span"
  );
  if (Boolean(achieveChart)) {
    statusText.innerText = `${achieveChart}%`;
  } else {
    statusText.innerText = "0%";
  }
};
