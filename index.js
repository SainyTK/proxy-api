const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/', async (req, res) => {
    const { method, url, body, headers } = req.body;
    try {
        const result = await axios({
            url,
            method,
            headers,
            data: body
        }).then(res => res.data);
        return res.status(200).json(result);
    } catch (e) {
        console.log('error', e);
        res.status(400).json({ status: 'ERROR', e })
    }
})


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));