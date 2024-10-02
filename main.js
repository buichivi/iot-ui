import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDAeub2FFhvzlXDhB6S8E1IUsOnwgWO3xo',
  authDomain: 'iot-1c09a.firebaseapp.com',
  databaseURL: 'https://iot-1c09a-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'iot-1c09a',
  storageBucket: 'iot-1c09a.appspot.com',
  messagingSenderId: '850194723700',
  appId: '1:850194723700:web:7d41bf1403ae581a9cb221',
  measurementId: 'G-JJ9WTD5X30',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Hàm đọc dữ liệu từ Realtime Database
function readUserData() {
  const dbRef = ref(database);
  onValue(
    dbRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Dữ liệu từ cảm biến:', data);

        // Cập nhật nội dung HTML
        document.querySelector('#flameDetected .value').textContent =
          data.flameDetected == 0 ? 'Có lửa' : 'Không phát hiện';
        document.querySelector('#gas .value').textContent = data.gas;
        document.querySelector('#humidity .value').textContent = data.humidity;
        document.querySelector('#temperature .value').textContent = data.temperature;
        if (data.flameDetected == 0) document.querySelector('.fire-warning').style.display = 'flex';
        else document.querySelector('.fire-warning').style.display = 'none';
      } else {
        console.log('Không tìm thấy dữ liệu!');
      }
    },
    (error) => {
      console.error('Lỗi khi lắng nghe dữ liệu:', error);
    }
  );
}
readUserData();
