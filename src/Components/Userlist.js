import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Userlist() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState(null);
    const fruits = [
        { 
            name: 'Apple', 
            images: [
                `${process.env.PUBLIC_URL}/images/apple.jpeg`
            ] 
        },
        { 
            name: 'Apricot', 
            images: [
                `${process.env.PUBLIC_URL}/images/Apricot.jpeg` 
            ] 
        },
        { 
            name: 'Avocados', 
            images: [
                `${process.env.PUBLIC_URL}/images/Avocados.jpeg` 
            ] 
        },
        { 
            name: 'Bananas', 
            images: [
                `${process.env.PUBLIC_URL}/images/Bananas.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Bell Peppers', 
            images: [
                `${process.env.PUBLIC_URL}/images/Bell Peppers.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Blackberries', 
            images: [
                `${process.env.PUBLIC_URL}/images/Blackberries.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Cantaloupe', 
            images: [
                `${process.env.PUBLIC_URL}/images/Cantaloupe.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Cherries', 
            images: [
                `${process.env.PUBLIC_URL}/images/Cherries.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Coconut', 
            images: [
                `${process.env.PUBLIC_URL}/images/Coconut.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Cranberries', 
            images: [
                `${process.env.PUBLIC_URL}/images/Cranberries.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Cucumbers', 
            images: [
                `${process.env.PUBLIC_URL}/images/Cucumbers.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Dates', 
            images: [
                `${process.env.PUBLIC_URL}/images/Dates.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Dragon Fruit', 
            images: [
                `${process.env.PUBLIC_URL}/images/Dragon Fruit.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Durian', 
            images: [
                `${process.env.PUBLIC_URL}/images/Durian.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Eggplant', 
            images: [
                `${process.env.PUBLIC_URL}/images/Eggplant.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Figs', 
            images: [
                `${process.env.PUBLIC_URL}/images/Figs.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Grapefruit', 
            images: [
                `${process.env.PUBLIC_URL}/images/Grapefruit.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Grapes', 
            images: [
                `${process.env.PUBLIC_URL}/images/Grapes.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Guava', 
            images: [
                `${process.env.PUBLIC_URL}/images/Guava.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Honeydew', 
            images: [
                `${process.env.PUBLIC_URL}/images/Honeydew.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Jackfruit', 
            images: [
                `${process.env.PUBLIC_URL}/images/Jackfruit.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Kiwis', 
            images: [
                `${process.env.PUBLIC_URL}/images/Kiwis.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Lemons', 
            images: [
                `${process.env.PUBLIC_URL}/images/Lemons.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Limes', 
            images: [
                `${process.env.PUBLIC_URL}/images/Limes.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Lychees', 
            images: [
                `${process.env.PUBLIC_URL}/images/Lychees.jpg` 
            ] 
        }
        ,
        { 
            name: 'Mangoes', 
            images: [
                `${process.env.PUBLIC_URL}/images/Mangoes.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Mulberries', 
            images: [
                `${process.env.PUBLIC_URL}/images/Mulberries.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Olives', 
            images: [
                `${process.env.PUBLIC_URL}/images/Olives.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Oranges', 
            images: [
                `${process.env.PUBLIC_URL}/images/orange.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Papayas', 
            images: [
                `${process.env.PUBLIC_URL}/images/Papayas.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Passion Fruit', 
            images: [
                `${process.env.PUBLIC_URL}/images/Passion Fruit.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Peaches', 
            images: [
                `${process.env.PUBLIC_URL}/images/Peaches.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Pears', 
            images: [
                `${process.env.PUBLIC_URL}/images/Pears.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Persimmons', 
            images: [
                `${process.env.PUBLIC_URL}/images/Persimmons.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Pineapples', 
            images: [
                `${process.env.PUBLIC_URL}/images/Pineapples.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Plums', 
            images: [
                `${process.env.PUBLIC_URL}/images/Plums.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Pomegranates', 
            images: [
                `${process.env.PUBLIC_URL}/images/Pomegranates.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Pumpkins', 
            images: [
                `${process.env.PUBLIC_URL}/images/Pumpkins.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Raspberries', 
            images: [
                `${process.env.PUBLIC_URL}/images/Raspberries.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Rambutan', 
            images: [
                `${process.env.PUBLIC_URL}/images/Rambutan.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Starfruit', 
            images: [
                `${process.env.PUBLIC_URL}/images/Starfruit.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Strawberries', 
            images: [
                `${process.env.PUBLIC_URL}/images/Strawberries.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Tomatoes', 
            images: [
                `${process.env.PUBLIC_URL}/images/Tomatoes.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Watermelon', 
            images: [
                `${process.env.PUBLIC_URL}/images/Watermelon.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Zucchini', 
            images: [
                `${process.env.PUBLIC_URL}/images/Zucchini.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Asparagus', 
            images: [
                `${process.env.PUBLIC_URL}/images/Asparagus.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Arugula', 
            images: [
                `${process.env.PUBLIC_URL}/images/Arugula.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Basil', 
            images: [
                `${process.env.PUBLIC_URL}/images/Basil.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Beets', 
            images: [
                `${process.env.PUBLIC_URL}/images/Beets.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Bell', 
            images: [
                `${process.env.PUBLIC_URL}/images/Bell.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Peppers', 
            images: [
                `${process.env.PUBLIC_URL}/images/Peppers.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Bok Choy', 
            images: [
                `${process.env.PUBLIC_URL}/images/Bok Choy.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Bottle Gourd', 
            images: [
                `${process.env.PUBLIC_URL}/images/Bottle Gourd.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Broccoli', 
            images: [
                `${process.env.PUBLIC_URL}/images/Broccoli.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Bitter Melon', 
            images: [
                `${process.env.PUBLIC_URL}/images/Bitter Melon.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Cabbage', 
            images: [
                `${process.env.PUBLIC_URL}/images/Cabbage.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Carrots', 
            images: [
                `${process.env.PUBLIC_URL}/images/Carrots.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Cauliflower', 
            images: [
                `${process.env.PUBLIC_URL}/images/Cauliflower.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Celery', 
            images: [
                `${process.env.PUBLIC_URL}/images/Celery.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Celeriac', 
            images: [
                `${process.env.PUBLIC_URL}/images/Celeriac.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Chickpeas', 
            images: [
                `${process.env.PUBLIC_URL}/images/Chickpeas.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Cilantro', 
            images: [
                `${process.env.PUBLIC_URL}/images/Cilantro.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Collard Greens', 
            images: [
                `${process.env.PUBLIC_URL}/images/Collard Greens.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Eggplant', 
            images: [
                `${process.env.PUBLIC_URL}/images/Eggplant.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Edamame', 
            images: [
                `${process.env.PUBLIC_URL}/images/Edamame.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Garlic', 
            images: [
                `${process.env.PUBLIC_URL}/images/Garlic.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Beans', 
            images: [
                `${process.env.PUBLIC_URL}/images/Beans.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Kale', 
            images: [
                `${process.env.PUBLIC_URL}/images/Kale.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Kohlrabi', 
            images: [
                `${process.env.PUBLIC_URL}/images/Kohlrabi.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Lentils', 
            images: [
                `${process.env.PUBLIC_URL}/images/Lentils.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Lettuce', 
            images: [
                `${process.env.PUBLIC_URL}/images/Lettuce.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Mint', 
            images: [
                `${process.env.PUBLIC_URL}/images/Mint.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Mushrooms', 
            images: [
                `${process.env.PUBLIC_URL}/images/Mushrooms.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Mustard Greens', 
            images: [
                `${process.env.PUBLIC_URL}/images/Mustard Greens.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Onions', 
            images: [
                `${process.env.PUBLIC_URL}/images/Onions.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Parsley', 
            images: [
                `${process.env.PUBLIC_URL}/images/Parsley.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Potatoes', 
            images: [
                `${process.env.PUBLIC_URL}/images/Potatoes.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Swiss Chard', 
            images: [
                `${process.env.PUBLIC_URL}/images/Swiss Chard.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Radishes', 
            images: [
                `${process.env.PUBLIC_URL}/images/Radishes.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Scallions', 
            images: [
                `${process.env.PUBLIC_URL}/images/Scallions.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Rhubarb', 
            images: [
                `${process.env.PUBLIC_URL}/images/Rhubarb.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Seaweed', 
            images: [
                `${process.env.PUBLIC_URL}/images/Seaweed.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Snake Gourd', 
            images: [
                `${process.env.PUBLIC_URL}/images/Snake Gourd.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Spinach', 
            images: [
                `${process.env.PUBLIC_URL}/images/Spinach.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Squash', 
            images: [
                `${process.env.PUBLIC_URL}/images/Squash.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Swiss Chard', 
            images: [
                `${process.env.PUBLIC_URL}/images/Swiss Chard.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Turnips', 
            images: [
                `${process.env.PUBLIC_URL}/images/Turnips.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Watercress', 
            images: [
                `${process.env.PUBLIC_URL}/images/Watercress.jpeg` 
            ] 
        }
        ,
        { 
            name: 'Yams', 
            images: [
                `${process.env.PUBLIC_URL}/images/Yams.jpeg` 
            ] 
        }
        ,
        { 
            name: 'rahul', 
            images: [
                `${process.env.PUBLIC_URL}/images/rahul.jpeg` 
            ] 
        }
        ,
        { 
            name: 'rahul', 
            images: [
                `${process.env.PUBLIC_URL}/images/rahul.jpeg` 
            ] 
        }
        ,
        { 
            name: 'rahul', 
            images: [
                `${process.env.PUBLIC_URL}/images/rahul.jpeg` 
            ] 
        }
        ,
        { 
            name: 'rahul', 
            images: [
                `${process.env.PUBLIC_URL}/images/rahul.jpeg` 
            ] 
        }
        ,
        { 
            name: 'rahul', 
            images: [
                `${process.env.PUBLIC_URL}/images/rahul.jpeg` 
            ] 
        }
        ,
        { 
            name: 'rahul', 
            images: [
                `${process.env.PUBLIC_URL}/images/rahul.jpeg` 
            ] 
        }
        ,
        { 
            name: 'rahul', 
            images: [
                `${process.env.PUBLIC_URL}/images/rahul.jpeg` 
            ] 
        }
    ];
    // Fetch users when the component loads
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get('http://localhost:80/api/user')
            .then(function (response) {
                setUsers(response.data);
            });
    };

    // Function to delete a user by id
    const deleteUser = (id) => {
        axios.delete(`http://localhost:80/api/user/${id}/delete`)
            .then(function (response) {
                getUsers(); // Refresh the user list after deletion
                setMessage('Deleted from database');
                setError('');
            })
            .catch(function (error) {
                setError('Failed to delete user');
                console.error('Error deleting user:', error);
            });
    };

    const getRandomImage = (name) => {
        const item = fruits.find(item => item.name === name);
        if (item) {
            const randomIndex = Math.floor(Math.random() * item.images.length);
            return item.images[randomIndex];
        }
        return null;
    };

    // Function to fetch products by email
    const fetchData = async () => {
        if (!email) {
            setError('Please enter an email address');
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/; // Simple email validation
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError(''); // Clear previous errors
        try {
            const response = await fetch(`http://localhost:80/api/fetch.php?email=${encodeURIComponent(email)}`);

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();
            if (result.length === 0) {
                setError("No data found for this email");
                setData(null);
            } else {
                setData(result);
                setError('');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data");
        }
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                <input
                    style={{ margin: '10px', height: '30px', width: '260px' }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
                <button onClick={fetchData} style={{ height: '30px', width: '150px' }}>Fetch My Products</button>

                {/* Display errors if any */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Display data if available */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {data ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {data.map((item, index) => (
                                    <div key={index} id='delete' style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '100px' }}>
                                        <h3>{item.name}</h3>
                                        <p><strong>Price:</strong> ₹{item.price} per kg</p>
                                        <p> <strong>Address:</strong> {item.address}</p>
                                        <i class="fa-solid fa-map-location"></i>
                                        <p style={{ color: 'red' }}>{item.stock}</p>
                                                            <div style={{ height: '100px', width: '100px' }}>
                                                                {item.name === 'Apple' || item.name==='Apricot' ||item.name==='Bananas' ||
                                                                item.name==='Bell Peppers' || item.name==='Blackberries'|| item.name==='Cantaloupe' || item.name==='Cherries' ||item.name==='Coconut' ||
                                                                item.name==='Cranberries' ||item.name==='Cucumbers' || 
                                                                item.name==='Dates' || 
                                                                item.name==='Dragon Fruit' ||item.name==='Durian' ||item.name==='Eggplant' || item.name==='Figs' || item.name==='Grapefruit' || item.name==='Grapes' ||
                                                                item.name==='Guava' ||
                                                                item.name==='Honeydew' ||
                                                                item.name==='Jackfruit' ||
                                                                item.name==='Kiwis' ||
                                                                item.name==='Lemons' ||
                                                                item.name==='Limes' ||
                                                                item.name==='Lychees' ||
                                                                item.name==='Mangoes' ||
                                                                item.name==='Mulberries' ||
                                                                item.name==='Olives' ||
                                                                item.name==='Oranges' ||
                                                                item.name==='Papayas' ||
                                                                item.name==='Passion Fruit' ||
                                                                item.name==='Peaches' ||
                                                                item.name==='Pears' ||
                                                                item.name==='Persimmons' ||
                                                                item.name==='Pineapples' ||
                                                                item.name==='Plums' ||
                                                                item.name==='Pomegranates' ||
                                                                item.name==='Pumpkins' ||
                                                                item.name==='Raspberries' ||
                                                                item.name==='Rambutan' ||
                                                                item.name==='Starfruit' ||
                                                                item.name==='Strawberries' ||
                                                                item.name==='Tomatoes' ||
                                                                item.name==='Watermelon' ||
                                                                item.name==='Zucchini' ||
                                                                item.name==='Asparagus' || item.name==='Arugula' ||item.name==='Basil' || item.name==='Beets' ||item.name==='Bell' ||
                                                                item.name==='Peppers' ||
                                                                item.name==='Bitter Melon' ||
                                                                item.name==='Bok Choy' ||
                                                                item.name==='Bottle Gourd' || item.name==='Broccoli'||
                                                                item.name==='Cabbage'||
                                                                item.name==='Carrots'||
                                                                item.name==='Cauliflower'||
                                                                item.name==='Celery'||
                                                                item.name==='Celeriac'||
                                                                item.name==='Chickpeas'||
                                                                item.name==='Cilantro'||
                                                                item.name==='Collard Greens'||
                                                                item.name==='Dill'||
                                                                item.name==='Edamame'||
                                                                item.name==='Garlic'||
                                                                item.name==='Beans'||
                                                                item.name==='Kale'||
                                                                item.name==='Kohlrabi'||
                                                                item.name==='Lentils'||
                                                                item.name==='Lettuce'||
                                                                item.name==='Mint'||
                                                                item.name==='Mushrooms'||
                                                                item.name==='Mustard Greens'||
                                                                item.name==='Onions'||
                                                                item.name==='Parsley'||
                                                                item.name==='Potatoes'||
                                                                item.name==='Swiss Chard'||
                                                                item.name==='Pumpkins'||
                                                                item.name==='Radishes'||
                                                                item.name==='Rhubarb'||
                                                                item.name==='Scallions'||
                                                                item.name==='Snake Gourd'||
                                                                item.name==='Spinach'||
                                                                item.name==='Squash'||
                                                                item.name==='Swiss Chard'||
                                                                item.name==='Turnips'||
                                                                item.name==='Watercress'||
                                                                item.name==='Watercress'||
                                                                item.name === 'Yams' ? (
                                                                <img 
                                                                    src={getRandomImage(item.name)} 
                                                                    alt={item.name} 
                                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                                                                />
                                                            ) : null}
                                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '5px' }}>
                                            <Link to={`user/${item.id}/edit`} style={{ textDecoration: 'none' }}>
                                                <button style={{ height: '20px', width: '50px' }}>Edit</button>
                                            </Link>
                                            <button onClick={() => deleteUser(item.id)} style={{ height: '20px', width: '50px' }}>Delete</button>
                                        </div>
                                    </div>
                                    
                                ))}
                                {message && <p>{message}</p>}
                            </div>
                        </>
                    ) : (
                        error && <p>No data found!</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Userlist;
