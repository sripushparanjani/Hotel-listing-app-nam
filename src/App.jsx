
import { useState } from 'react'
import './App.css'

const sampleHotels = [
  {
    id: 1,
    name: 'The Taj Mahal Palace',
    city: 'Mumbai',
    address: 'Apollo Bunder, Colaba, Mumbai, Maharashtra 400001',
    description: 'A historic luxury hotel overlooking the Gateway of India.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    latitude: 18.9220,
    longitude: 72.8333,
    price: 30000,
  },
  {
    id: 2,
    name: 'Taj Coromandel',
    city: 'Chennai',
    address: '37, Mahatma Gandhi Salai, Nungambakkam, Chennai, Tamil Nadu 600034',
    description: 'A luxury city hotel known for its dining and central location.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
    latitude: 13.0583,
    longitude: 80.2476,
    price: 18000,
  },
  {
    id: 3,
    name: 'Taj MG Road',
    city: 'Bengaluru',
    address: '41/3, MG Road, Bengaluru, Karnataka 560001',
    description: 'A city hotel close to central Bengaluru shopping and business areas.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    latitude: 12.9747,
    longitude: 77.6057,
    price: 15000,
  },
  {
    id: 4,
    name: 'Taj Palace',
    city: 'New Delhi',
    address: '2, Sardar Patel Marg, Diplomatic Enclave, New Delhi 110021',
    description: 'A luxury hotel in the diplomatic area of the capital.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    latitude: 28.5958,
    longitude: 77.1736,
    price: 20000,
  },
  {
    id: 5,
    name: 'Rambagh Palace',
    city: 'Jaipur',
    address: 'Bhawani Singh Road, Jaipur, Rajasthan 302005',
    description: 'A former royal residence surrounded by landscaped gardens.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    latitude: 26.8915,
    longitude: 75.8071,
    price: 45000,
  },
  {
    id: 6,
    name: 'Taj Lake Palace',
    city: 'Udaipur',
    address: 'Lake Pichola, Udaipur, Rajasthan 313001',
    description: 'A heritage palace hotel set on Lake Pichola.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    latitude: 24.5764,
    longitude: 73.6800,
    price: 55000,
  },
  {
    id: 7,
    name: 'Taj Malabar Resort & Spa',
    city: 'Kochi',
    address: 'Willingdon Island, Kochi, Kerala 682009',
    description: 'A waterfront resort on Willingdon Island in Kochi.',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=800&q=80',
    latitude: 9.9670,
    longitude: 76.2420,
    price: 18000,
  },
  {
    id: 8,
    name: 'Taj Bengal',
    city: 'Kolkata',
    address: '34-B, Belvedere Road, Alipore, Kolkata, West Bengal 700027',
    description: 'A luxury hotel in the Alipore area of Kolkata.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    latitude: 22.5375,
    longitude: 88.3325,
    price: 18000,
  },
  {
    id: 9,
    name: 'The Oberoi Amarvilas',
    city: 'Agra',
    address: 'Taj East Gate Road, Agra, Uttar Pradesh 282001',
    description: 'A luxury hotel known for views of the Taj Mahal.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    latitude: 27.1680,
    longitude: 78.0422,
    price: 40000,
  },
  {
    id: 10,
    name: 'Taj Falaknuma Palace',
    city: 'Hyderabad',
    address: 'Engine Bowli, Falaknuma, Hyderabad, Telangana 500053',
    description: 'A historic palace hotel on a hill overlooking Hyderabad.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    latitude: 17.3315,
    longitude: 78.4674,
    price: 60000,
  },
]

const emptyForm = {
  name: '',
  city: '',
  address: '',
  description: '',
  image: '',
  latitude: '',
  longitude: '',
  price: '',
}

function App() {
  const [hotels, setHotels] = useState(sampleHotels)
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))

    setMessage('')
  }

  function handleImageChange(event) {
    const file = event.target.files[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage('Please choose a valid image file.')
      event.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage('The image must be smaller than 5 MB.')
      event.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setForm((previousForm) => ({
        ...previousForm,
        image: reader.result,
      }))
      setMessage('')
    }

    reader.onerror = () => {
      setMessage('Unable to read this image. Please try again.')
    }

    reader.readAsDataURL(file)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const name = form.name.trim()
    const city = form.city.trim()
    const address = form.address.trim()
    const description = form.description.trim()
    const latitude = Number(form.latitude)
    const longitude = Number(form.longitude)
    const price = Number(form.price)

    if (!name || !city || !address || !description || !form.image) {
      setMessage('Please complete all fields and select an image.')
      return
    }

    if (
      form.latitude.trim() === '' ||
      !Number.isFinite(latitude) ||
      latitude < -90 ||
      latitude > 90
    ) {
      setMessage('Latitude must be between -90 and 90.')
      return
    }

    if (
      form.longitude.trim() === '' ||
      !Number.isFinite(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      setMessage('Longitude must be between -180 and 180.')
      return
    }

    if (
      form.price.trim() === '' ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setMessage('Enter a valid price greater than zero.')
      return
    }

    const hotelDetails = {
      name,
      city,
      address,
      description,
      image: form.image,
      latitude,
      longitude,
      price,
    }

    if (editingId !== null) {
      setHotels((previousHotels) =>
        previousHotels.map((hotel) =>
          hotel.id === editingId
            ? { ...hotel, ...hotelDetails }
            : hotel
        )
      )

      setMessage('Hotel updated successfully!')
    } else {
      setHotels((previousHotels) => [
        { id: Date.now(), ...hotelDetails },
        ...previousHotels,
      ])

      setMessage('Hotel added successfully!')
    }

    setForm(emptyForm)
    setEditingId(null)

    const imageInput = document.getElementById('hotel-image')

    if (imageInput) {
      imageInput.value = ''
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function handleEdit(hotel) {
    setForm({
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      description: hotel.description,
      image: hotel.image,
      latitude: String(hotel.latitude),
      longitude: String(hotel.longitude),
      price: String(hotel.price),
    })

    setEditingId(hotel.id)
    setMessage('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setMessage('')

    const imageInput = document.getElementById('hotel-image')

    if (imageInput) {
      imageInput.value = ''
    }
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this hotel?'
    )

    if (!confirmed) return

    setHotels((previousHotels) =>
      previousHotels.filter((hotel) => hotel.id !== id)
    )

    if (editingId === id) {
      resetForm()
    } else {
      setMessage('Hotel deleted successfully!')
    }
  }

  const filteredHotels = hotels.filter((hotel) => {
    const searchText = search.trim().toLowerCase()

    const matchesSearch = [
      hotel.name,
      hotel.city,
      hotel.address,
      hotel.description,
    ].some((value) => value.toLowerCase().includes(searchText))

    const matchesPrice =
      maxPrice === 'all' || hotel.price <= Number(maxPrice)

    return matchesSearch && matchesPrice
  })

  return (
    <div className="app">
      <header className="top-bar">
        <h1>
          <a href="#home">StayFinder</a>
        </h1>

        <nav>
          <a href="#hotels">Hotel Listing</a>
          <a href="#add-hotel">Add a Hotel</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-text">
            <p className="small-heading">HOTELS ACROSS INDIA</p>

            <h1>
              Find a place
              <br />
              <span>to stay.</span>
            </h1>

            <p>
              Explore hotels in different Indian cities, compare
              estimated prices and view their locations.
            </p>

            <a href="#hotels" className="button primary-button">
              View Hotels
            </a>
          </div>

          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
            alt="Hotel and swimming pool"
          />
        </section>

        <section className="form-section" id="add-hotel">
          <div className="section-title">
            <p className="small-heading">HOTEL DETAILS</p>

            <h2>
              {editingId !== null ? 'Edit Hotel' : 'Add a Hotel'}
            </h2>

            <p>Enter the hotel's name, address and other details.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="hotel-name">Hotel Name *</label>

                <input
                  id="hotel-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter hotel name"
                  maxLength={100}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hotel-city">City *</label>

                <input
                  id="hotel-city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="hotel-address">Full Address *</label>

                <input
                  id="hotel-address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, area, city, state and PIN code"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hotel-price">
                  Price per Night (₹) *
                </label>

                <input
                  id="hotel-price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter estimated price"
                  required
                />

                <small>
                  Use an estimated price if the live rate is unknown.
                </small>
              </div>

              <div className="form-group full-width">
                <label htmlFor="hotel-description">Description *</label>

                <textarea
                  id="hotel-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write a short description"
                  rows="4"
                  maxLength={1000}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="hotel-image">Hotel Image *</label>

                <input
                  id="hotel-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!form.image}
                />

                <small>Choose an image up to 5 MB.</small>

                {form.image && (
                  <div className="image-preview">
                    <img src={form.image} alt="Hotel preview" />
                    <span>Image preview</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="hotel-latitude">Latitude *</label>

                <input
                  id="hotel-latitude"
                  name="latitude"
                  type="number"
                  min="-90"
                  max="90"
                  step="any"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="e.g. 18.9220"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hotel-longitude">Longitude *</label>

                <input
                  id="hotel-longitude"
                  name="longitude"
                  type="number"
                  min="-180"
                  max="180"
                  step="any"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="e.g. 72.8333"
                  required
                />
              </div>
            </div>

            {message && (
              <p
                className={
                  message.includes('successfully')
                    ? 'message success-message'
                    : 'message error-message'
                }
                role="status"
              >
                {message}
              </p>
            )}

            <div className="form-buttons">
              <button type="submit" className="button primary-button">
                {editingId !== null ? 'Save Changes' : 'Add Hotel'}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="button cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="hotels-section" id="hotels">
          <div className="section-title">
            <p className="small-heading">EXPLORE INDIA</p>
            <h2>Hotel Listings</h2>
            <p>Search by hotel name, city or address.</p>
          </div>

          <div className="search-box">
            <div className="form-group">
              <label htmlFor="hotel-search">Search Hotels</label>

              <input
                id="hotel-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Try Mumbai, Chennai or Taj..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="price-filter">
                Maximum Price per Night
              </label>

              <select
                id="price-filter"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="5000">Up to ₹5,000</option>
                <option value="10000">Up to ₹10,000</option>
                <option value="20000">Up to ₹20,000</option>
                <option value="30000">Up to ₹30,000</option>
                <option value="50000">Up to ₹50,000</option>
                <option value="100000">Up to ₹1,00,000</option>
              </select>
            </div>
          </div>

          <p className="result-count">
            {filteredHotels.length} hotel(s) found
          </p>

          <div className="hotel-grid">
            {filteredHotels.map((hotel) => (
              <article className="hotel-card" key={hotel.id}>
                <img
                  className="hotel-card-image"
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                />

                <div className="hotel-card-content">
                  <h3>{hotel.name}</h3>

                  <p className="hotel-city">
                    {hotel.city}, India
                  </p>

                  <p className="hotel-description">
                    {hotel.description}
                  </p>

                  <p className="hotel-address">
                    {hotel.address}
                  </p>

                  <p className="hotel-price">
                    Approx. ₹{hotel.price.toLocaleString('en-IN')} / night
                  </p>

                  <div className="location-details">
                    <p>Latitude: {hotel.latitude}</p>
                    <p>Longitude: {hotel.longitude}</p>
                  </div>

                  <a
                    className="button map-button"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${hotel.latitude},${hotel.longitude}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>

                  <div className="card-buttons">
                    <button
                      type="button"
                      className="button edit-button"
                      onClick={() => handleEdit(hotel)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="button delete-button"
                      onClick={() => handleDelete(hotel.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredHotels.length === 0 && (
            <div className="no-results">
              <h3>No hotels found</h3>

              <p>
                Try another city, hotel name or price range.
              </p>

              <button
                type="button"
                className="button primary-button"
                onClick={() => {
                  setSearch('')
                  setMaxPrice('all')
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <h3>StayFinder</h3>

        <p>Explore hotels and places to stay across India.</p>

        <p>Room prices shown are estimates for demonstration.</p>

        <p>© {new Date().getFullYear()} StayFinder</p>
      </footer>
    </div>
  )
}

export default App
