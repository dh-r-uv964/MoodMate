const form = document.getElementById('moodForm');
const moodSelect = document.getElementById('mood');
const tip = document.getElementById('tip');
const ctx = document.getElementById('moodChart').getContext('2d');

const tips = {
  "Happy": "Keep spreading the joy today 🌼",
  "Sad": "It's okay to feel down. Be kind to yourself 💛",
  "Stressed": "Take a deep breath. Try a 5-minute walk 🌿",
  "Calm": "Enjoy the peace — you earned it 🧘",
  "Anxious": "You're not alone. Try journaling or talking to a friend 🤝"
};

let moodLogs = [];
let dateLabels = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const mood = moodSelect.value;
  if (mood) {
    moodLogs.push(mood);
    dateLabels.push(new Date().toLocaleDateString());
    tip.textContent = tips[mood] || "Take care of yourself 🌟";
    updateChart();
    moodSelect.value = "";
  }
});

const moodChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dateLabels,
    datasets: [{
      label: 'Mood Over Time',
      data: [],
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      fill: true
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return ["", "Sad", "Anxious", "Stressed", "Calm", "Happy"][value];
          }
        }
      }
    }
  }
});

function updateChart() {
  const moodToNumber = {
    "Sad": 1,
    "Anxious": 2,
    "Stressed": 3,
    "Calm": 4,
    "Happy": 5
  };
  moodChart.data.labels = dateLabels;
  moodChart.data.datasets[0].data = moodLogs.map(m => moodToNumber[m]);
  moodChart.update();
}
