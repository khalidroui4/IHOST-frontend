import axios from 'axios';

const token = process.argv[2];

async function add() {
    try {
        const res = await axios.post('http://localhost/IHOST-backend/cart/add', 
            { serviceId: 1, durationMonths: 1 },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("SUCCESS:", res.data);
        
        const getRes = await axios.get('http://localhost/IHOST-backend/cart', 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("CART CONTENTS:", getRes.data);
    } catch (e) {
        console.error("ERROR:", e.response?.data || e.message);
    }
}

add();
