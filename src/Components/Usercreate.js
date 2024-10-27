import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Usercreate() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevValues => ({ ...prevValues, [name]: value }));
    };

    // Validate the inputs before form submission
    const validateInputs = () => {
        if (!inputs.name || !inputs.email || !inputs.price || !inputs.location || !inputs.stock || !inputs.address) {
            setError('All fields are required.');
            return false;
        }

        // Basic email validation regex
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(inputs.email)) {
            setError('Please enter a valid email address.');
            return false;
        }

        // Ensure the price is a valid positive number
        if (inputs.price <= 0) {
            setError('Price must be a positive number.');
            return false;
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Perform validation before submitting
        if (!validateInputs()) return;

        // Clear error message after validation passes
        setError('');

        // Submit the form data to the API
        axios.post('http://localhost:80/api/user/save', inputs)
            .then(function(response) {
                setMessage('Form submitted successfully.');
                document.getElementById('form').style.display = 'none';
                navigate('/logincost');
            })
            .catch(error => {
                console.error('Error submitting the form:', error);
                setMessage('Error submitting the form.');
            });
            setStep(0);
    };
    const fruits = ['Apple', 'Apricot', 'Avocados', 'Bananas', 'Bell Peppers', 'Blackberries', 'Blueberries','Cantaloupe', 'Cherries', 'Coconut', 'Cranberries', 'Cucumbers', 'Dates', 'Dragon Fruit', 'Durian', 'Eggplant', 'Figs', 'Grapefruit', 'Grapes', 'Guava', 'Honeydew', 'Jackfruit','Kiwis', 'Lemons', 'Limes', 'Lychees','Mangoes', 'Mulberries', 'Olives', 'Oranges', 'Papayas', 'Passion Fruit', 'Peaches', 'Pears', 'Persimmons', 'Pineapples', 'Plums', 'Pomegranates', 'Pumpkins', 'Raspberries', 'Rambutan', 'Starfruit', 'Strawberries', 'Tomatoes', 'Watermelon', 'Zucchini'];

    const vegitables=['Asparagus', 'Arugula', 'Basil', 'Beets', 'Bell' ,'Peppers', 'Bitter Melon',' Bok Choy', 'Bottle Gourd', 'Broccoli','Cabbage', 'Carrots', 'Cauliflower', 'Celery', 'Celeriac', 'Chickpeas', 'Cilantro', 'Collard Greens', 'Cucumbers', 'Edamame', 'Eggplant', 'Garlic','Beans', 'Kale', 'Kohlrabi','Lentils', 'Lettuce', 'Mint', 'Mushrooms', 'Mustard Greens', 'Onions', 'Parsley', 'Potatoes', 'Pumpkins', 'Radishes', 'Rhubarb', 'Scallions','Snake Gourd', 'Spinach', 'Squash', 'Swiss Chard',' Tomatoes', 'Turnips', 'Watercress',' Yams',' Zucchini'];

    const locations=['Ameerpet', 'Ameerpet Junction','Ameerpet Main Road', 'Ameerpet Metro Station Area', 'Abids', 'Abids Street Market',' Afzalgunj', 'Amberpet',' Amberpet Circle', 'Amberpet Main Road',' Anandbagh', 'Ananthagiri Hills', 'Attapur', 'Attapur Market', 'Badi Chowdi', 'Barkatpur',' Barkas', 'Barkas Market', 'Begum Bazaar', 'Begumpet', 'Beeramguda',' Banjara Hills',' Balapur', 'Balkampet', 'Bandlaguda Jagir', 'Bolarum', 'Borabad Market',' Borabanda Market', 'Champapet', 'Charminar Bazaar', 'Chandanagar', 'Chaderghat',' Chaderghat Crossroads', 'Chaitanyapuri', 'Chikkadpally', 'Chikkadpally Market', 'Chintal',' Chintal Vegetable Market',' Dabeerpura', 'Dilsukhnagar',' Durgam Cheruvu', 'ECIL Crossroads', 'ECIL Market',' Erragadda','Erragadda Rythu Bazaar', 'Falaknuma Market', 'Feelkhana',' Feelkhana Market',' Gaddiannaram', 'Gachibowli', 'Gachibowli Market',  'Gandi Maisamma', 'Golconda Fort Area', 'Golnaka', 'Goshamahal','Gunfoundry','Hayathnagar','Hayathnagar Crossroads','Himayatnagar','Habsiguda','Habsiguda','Habsiguda X Roads','Jambagh Vegetable Market','Jeedimetla','Jubilee Bus Station Area',' Jubilee Hills','Kachiguda','Kachiguda Main Road','Kachiguda Railway Station Area','Kothapet','Kothapet Fruit Market',' Kothaguda Market','Kondapur','Kompally',
    'Kompally Market','Kundanhalli',' LB Nagar','LB Nagar Ring Road',' LB Nagar Rythu Bazaar','Lingampally',' Lingampally Market',' Madhapur','Madhapur Hitech City Area',' Madhapur Hitech City Area','Malkajgiri','Malkajgiri Main Road','Malkajgiri Rythu Bazaar',' Mallapur','Manikonda','Manikonda Main Road','Masab Tank Market',' Mehdipatnam',' Mehdipatnam Rythu Bazaar',' Meerpet','Mettuguda',' Miyapur',' Miyapur Market','Miyapur X Roads','Moullali',' Nagole',' Nagole Market',' Nagole X Roads',' Narayanguda',' Nampally', 'Nampally Market', 'New Nallakunta', 'Nizampet', 'Nizampet X Roads',' Pahadishareef', 'Patancheru', 'Patancheru Market', 'Panjagutta',' Pragathi Nagar', 'Rajendranagar', 'Rajendranagar Market', 'Ram Nagar', 'Ramgopalpet', 'Ramanthapur', 'Rein Bazar', 'Sainikpuri',' Safilguda', 'Safilguda Rythu Bazaar', 'Saidabad', 'Saroornagar', 'Saroornagar Rythu Bazaar', 'Sanjeeva Reddy Nagar (SR Nagar)', 'Secunderabad', 'Seethaphalmandi',' Seethaphalmandi Market', 'Shalibanda', 'Shalibanda Market', 'Shamshabad', 'Shamshabad Airport Road', 'Shamshabad Market', 'Shivaji Nagar', 'Shivarampally', 'Somajiguda', 'Sultan Bazaar', 'Sultan Shahi', 'Tarnaka',' Tarnaka Junction', 'Toli Chowki', 'Toli Chowki Market', 'Trimulgherry',' Uppal', 'Uppal Market', 'Vanastalipuram', 'Vanastalipuram Rythu Bazaar', 'Vidyanagar', 'Vijayapur', 'Vasant Nagar',' West Marredpally', 'Yakutpura',' Yousufguda',' Zebra', 'Zebra Road']


    const [step, setStep] = useState(0);

    const changefruit=()=>{
        setStep(1);
    }
    const changevegitable=()=>{
        setStep(2)
    }



    return (
        <>
        {step===0 &&(
            <div>
            <button onClick={changefruit}  style={{ height: '30px', width: '150px' }}>SALE FRUIT</button>
            <button onClick={changevegitable}  style={{ height: '30px', width: '150px' }}>SALE VEGITABLE</button>
        </div>
        )}

        {step===1 &&(

        <div id='dashboard'style={{background:'white',  paddingTop:'100px'}}>
            <form onSubmit={handleSubmit} id='form' style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
                <h1>PRODUCT DETAILS FRUIT</h1>

                {/* Name Dropdown */}
                <select name="name" onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option>Select a fruit</option>
                    {fruits.map((fruit, index) => (
                    <option key={index} value={fruit}> {fruit}</option>
                    ))}
                </select>
                {/* <div>
                <select>
                {fruits.map((fruit, index) => (
                    <option key={index} value={fruit}> {fruit}
                     </option>
                    ))}
                    </select>
                </div> */}

                {/* Email Input */}
                <input type="text" name="email" onChange={handleChange} placeholder='Enter Email Address' style={{ margin: '10px', height: '30px', width: '260px' }} />

                {/* Location Dropdown */}
                <select name="location" onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option>Select a location</option>
                    {locations.map((location, index) => (
                    <option key={index} value={location}> {location}</option>
                    ))}
                </select>
                <textarea name="address" placeholder="enter exat location"onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px'}}>
                </textarea>


                {/* Price Input */}
                <input type="number" name="price" onChange={handleChange} placeholder="Enter cost" style={{ margin: '10px', height: '30px', width: '260px' }} />
                <select name="quantity" onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option value="">Select quantity </option>
                    <option value="per KG">per KG</option>
                    <option value="500gram">500gram</option>
                    <option value="per Bunch">per Bunch</option>
                </select>

                {/* Stock Dropdown */}
                <select name="stock" onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option value="">Select stock status</option>
                    <option value="In-stock">IN-STOCK</option>
                    <option value="Low-stock">LOW-STOCK</option>
                    <option value="Out-of-stock">OUT-OF-STOCK</option>
                </select>

                <button type="submit" style={{ height: '30px', width: '150px' }}>Save</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {/* Success message */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
        )}
        {step===2 &&(

            <div>
                <form onSubmit={handleSubmit} id='form' style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
                <h1>PRODUCT DETAILS VEGITABLE</h1>

                {/* Name Dropdown */}
                <select name="name" onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option value="">Select a vegitable</option>
                    {vegitables.map((fruit, index) => (
                    <option key={index} value={fruit}> {fruit}</option>
                    ))}
                </select>
                {/* <div>
                <select>
                {fruits.map((fruit, index) => (
                    <option key={index} value={fruit}> {fruit}
                    </option>
                    ))}
                    </select>
                </div> */}

                {/* Email Input */}
                <input type="text" name="email" onChange={handleChange} placeholder='Enter Email Address' style={{ margin: '10px', height: '30px', width: '260px' }} />

                {/* Location Dropdown */}
                <select name="location" onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option>Select a location</option>
                    {locations.map((location, index) => (
                    <option key={index} value={location}> {location}</option>
                    ))}
                </select>
                <textarea name="address" placeholder="enter exat location"onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px'}}>
                </textarea>
                 {/* Price Input */}
                 <input type="number" name="price" onChange={handleChange} placeholder="Enter cost" style={{ margin: '10px', height: '30px', width: '260px' }} />

                <select name="quantity" onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option value="">Select quantity </option>
                    <option value="per KG">per KG</option>
                    <option value="500gram">500gram</option>
                    <option value="per Bunch">per Bunch</option>
                </select>

                {/* Stock Dropdown */}
                <select name="stock" onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option value="">Select stock status</option>
                    <option value="In-stock">IN-STOCK</option>
                    <option value="Low-stock">LOW-STOCK</option>
                    <option value="Out-of-stock">OUT-OF-STOCK</option>
                </select>

                <button type="submit" style={{ height: '30px', width: '150px' }}>Save</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {/* Success message */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            </div>
        )}
        </>
    );
}

export default Usercreate;
