import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function Edit() {
    const navigate = useNavigate();
    const [input, setInputs] = useState({
        name: '',
        price: '',
        location: '',
        stock: ''
    });

    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost:80/api/user/${id}`)
            .then(function(response) {
                setInputs(response.data);
            })
            .catch(function(error) {
                console.error("There was an error fetching the user data!", error);
            });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:80/api/user/${id}/edit`, input)
            .then(function(response) {
                navigate('/logincost');
            })
            .catch(function(error) {
                console.error("There was an error updating the user!", error);
            });
            setStep(0);
    }
    const fruits = ['Apple', 'Apricot', 'Avocados', 'Bananas', 'Bell Peppers', 'Blackberries', 'Blueberries','Cantaloupe', 'Cherries', 'Coconut', 'Cranberries', 'Cucumbers', 'Dates', 'Dragon Fruit', 'Durian', 'Eggplant', 'Figs', 'Grapefruit', 'Grapes', 'Guava', 'Honeydew', 'Jackfruit','Kiwis', 'Lemons', 'Limes', 'Lychees','Mangoes', 'Mulberries', 'Olives', 'Oranges', 'Papayas', 'Passion Fruit', 'Peaches', 'Pears', 'Persimmons', 'Pineapples', 'Plums', 'Pomegranates', 'Pumpkins', 'Raspberries', 'Rambutan', 'Starfruit', 'Strawberries', 'Tomatoes', 'Watermelon', 'Zucchini'];

    const locations=['Ameerpet', 'Ameerpet Junction','Ameerpet Main Road', 'Ameerpet Metro Station Area', 'Abids', 'Abids Street Market',' Afzalgunj', 'Amberpet',' Amberpet Circle', 'Amberpet Main Road',' Anandbagh', 'Ananthagiri Hills', 'Attapur', 'Attapur Market', 'Badi Chowdi', 'Barkatpur',' Barkas', 'Barkas Market', 'Begum Bazaar', 'Begumpet', 'Beeramguda',' Banjara Hills',' Balapur', 'Balkampet', 'Bandlaguda Jagir', 'Bolarum', 'Borabad Market',' Borabanda Market', 'Champapet', 'Charminar Bazaar', 'Chandanagar', 'Chaderghat',' Chaderghat Crossroads', 'Chaitanyapuri', 'Chikkadpally', 'Chikkadpally Market', 'Chintal',' Chintal Vegetable Market',' Dabeerpura', 'Dilsukhnagar',' Durgam Cheruvu', 'ECIL Crossroads', 'ECIL Market',' Erragadda','Erragadda Rythu Bazaar', 'Falaknuma Market', 'Feelkhana',' Feelkhana Market',' Gaddiannaram', 'Gachibowli', 'Gachibowli Market',  'Gandi Maisamma', 'Golconda Fort Area', 'Golnaka', 'Goshamahal','Gunfoundry','Hayathnagar','Hayathnagar Crossroads','Himayatnagar','Habsiguda','Habsiguda','Habsiguda X Roads','Jambagh Vegetable Market','Jeedimetla','Jubilee Bus Station Area',' Jubilee Hills','Kachiguda','Kachiguda Main Road','Kachiguda Railway Station Area','Kothapet','Kothapet Fruit Market',' Kothaguda Market','Kondapur','Kompally',
    'Kompally Market','Kundanhalli',' LB Nagar','LB Nagar Ring Road',' LB Nagar Rythu Bazaar','Lingampally',' Lingampally Market',' Madhapur','Madhapur Hitech City Area',' Madhapur Hitech City Area','Malkajgiri','Malkajgiri Main Road','Malkajgiri Rythu Bazaar',' Mallapur','Manikonda','Manikonda Main Road','Masab Tank Market',' Mehdipatnam',' Mehdipatnam Rythu Bazaar',' Meerpet','Mettuguda',' Miyapur',' Miyapur Market','Miyapur X Roads','Moullali',' Nagole',' Nagole Market',' Nagole X Roads',' Narayanguda',' Nampally', 'Nampally Market', 'New Nallakunta', 'Nizampet', 'Nizampet X Roads',' Pahadishareef', 'Patancheru', 'Patancheru Market', 'Panjagutta',' Pragathi Nagar', 'Rajendranagar', 'Rajendranagar Market', 'Ram Nagar', 'Ramgopalpet', 'Ramanthapur', 'Rein Bazar', 'Sainikpuri',' Safilguda', 'Safilguda Rythu Bazaar', 'Saidabad', 'Saroornagar', 'Saroornagar Rythu Bazaar', 'Sanjeeva Reddy Nagar (SR Nagar)', 'Secunderabad', 'Seethaphalmandi',' Seethaphalmandi Market', 'Shalibanda', 'Shalibanda Market', 'Shamshabad', 'Shamshabad Airport Road', 'Shamshabad Market', 'Shivaji Nagar', 'Shivarampally', 'Somajiguda', 'Sultan Bazaar', 'Sultan Shahi', 'Tarnaka',' Tarnaka Junction', 'Toli Chowki', 'Toli Chowki Market', 'Trimulgherry',' Uppal', 'Uppal Market', 'Vanastalipuram', 'Vanastalipuram Rythu Bazaar', 'Vidyanagar', 'Vijayapur', 'Vasant Nagar',' West Marredpally', 'Yakutpura',' Yousufguda',' Zebra', 'Zebra Road']

    const vegitables=['Asparagus', 'Arugula', 'Basil', 'Beets', 'Bell' ,'Peppers', 'Bitter Melon',' Bok Choy', 'Bottle Gourd', 'Broccoli','Cabbage', 'Carrots', 'Cauliflower', 'Celery', 'Celeriac', 'Chickpeas', 'Cilantro', 'Collard Greens', 'Cucumbers', 'Edamame', 'Eggplant', 'Garlic','Beans', 'Kale', 'Kohlrabi','Lentils', 'Lettuce', 'Mint', 'Mushrooms', 'Mustard Greens', 'Onions', 'Parsley', 'Potatoes', 'Pumpkins', 'Radishes', 'Rhubarb', 'Scallions','Snake Gourd', 'Spinach', 'Squash', 'Swiss Chard',' Tomatoes', 'Turnips', 'Watercress',' Yams',' Zucchini'];



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
            <div id='dashboard'style={{background:'white',paddingTop:'100px'}}>
            <button onClick={changefruit}  style={{ height: '30px', width: '150px' }}>EDIT FRUIT</button>
            <button onClick={changevegitable}  style={{ height: '30px', width: '150px' }}>EDIT VEGITABLE</button>
           </div>

        )}
        {step===1 &&(
        <div id='dashboard'style={{background:'white',  paddingTop:'100px'}}>
            <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
                <h1>EDIT USER</h1>
                {/* <label>Name:</label> */}
                <select name="name" value={input.name} onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    {fruits.map((fruit, index) => (
                    <option key={index} value={fruit}> {fruit}</option>
                    ))}
                </select>

                {/* <label>Price:</label> */}
                <input type="number" name="price" value={input.price} onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}/>
                <br />

                {/* <label>Location:</label> */}
                <select name="location" value={input.location} onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option>Select a location</option>
                    {locations.map((location, index) => (
                    <option key={index} value={location}> {location}</option>
                    ))}
                </select>
                <textarea name="address" placeholder="enter exat location"onChange={handleChange} value={input.address} style={{ margin: '10px', height: '30px', width: '260px'}}>
                </textarea>

                {/* <label>Stock:</label> */}
                <select name="stock" value={input.stock} onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                    <option value="">Select stock status</option>
                    <option value="In-stock">IN-STOCK</option>
                    <option value="Low-stock">LOW-STOCK</option>
                    <option value="Out-of-stock">OUT-OF-STOCK</option>
                </select>
                <br />

                <button type="submit"  style={{ height: '30px', width: '150px',margin:"10px" }}>Save</button>
            </form>
        </div>
        )}
        {step===2 &&(
                    <div id='dashboard'style={{background:'white',paddingTop:'100px'}}>
                    <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
                        <h1>EDIT USER</h1> 
                        <select name="name" value={input.name} onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                            {vegitables.map((fruit, index) => (
                            <option key={index} value={fruit}> {fruit}</option>
                            ))}
                        </select>
        
                        {/* <label>Price:</label> */}
                        <input type="number" name="price" value={input.price} onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}/>
                        <br />
        
                        {/* <label>Location:</label> */}
                        <select name="location" value={input.location} onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                            <option>Select a location</option>
                            {locations.map((location, index) => (
                            <option key={index} value={location}> {location}</option>
                            ))}
                        </select>
                        <textarea name="address" placeholder="enter exat location"onChange={handleChange} value={input.address} style={{ margin: '10px', height: '30px', width: '260px'}}>
                        </textarea>
        
                        {/* <label>Stock:</label> */}
                        <select name="stock" value={input.stock} onChange={handleChange} style={{ margin: '10px', height: '30px', width: '260px' }}>
                            <option value="">Select stock status</option>
                            <option value="In-stock">IN-STOCK</option>
                            <option value="Low-stock">LOW-STOCK</option>
                            <option value="Out-of-stock">OUT-OF-STOCK</option>
                        </select>
        
                        <button type="submit"  style={{ height: '30px', width: '150px',margin:"10px" }}>Save</button>
                    </form>
                </div>

        )}
        </>
    );
}

export default Edit;
