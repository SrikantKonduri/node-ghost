import React, { useState } from 'react';
import { Button, Modal, Form, FormControl, Dropdown, DropdownButton , Badge} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'

const URL = `http://localhost:7070`

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('title'); // Default option

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setBlogsData(data.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAllBlogsClick = () => {
    fetchData(`${URL}/blogs`);
  };

  const handleRecentBlogsClick = () => {
    fetchData(`${URL}/blogs/search/recent`);
  };

  const handleSearchClick = async () => {
    let endpoint = ""
    if(searchOption === 'title'){
      endpoint =  `${URL}/blogs/search?title=${searchQuery}`
    }
    else if(searchOption === 'id'){
      endpoint =  `${URL}/blogs/search?id=${searchQuery}`
    }
    console.log(endpoint)
    fetchData(endpoint);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id='main'>
      <div><Button variant="primary" onClick={handleAllBlogsClick}>
        All Blogs
      </Button>{' '}
      <Button variant="info" onClick={handleRecentBlogsClick}>
        Recent Blogs
      </Button>{' '}</div>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <DropdownButton
          title={`Search by ${searchOption}`}
          id="dropdown-basic-button"
          onSelect={(eventKey) => setSearchOption(eventKey)}
        >
          <Dropdown.Item eventKey="title">Title</Dropdown.Item>
          <Dropdown.Item eventKey="id">ID</Dropdown.Item>
        </DropdownButton>
        <Button variant="outline-success" onClick={handleSearchClick}>
          Search
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal} fullscreen={showModal}  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Blog Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {blogsData.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              {/* <p>{blog.content}</p> */}
              <Badge variant="info">JSON Data</Badge>
              <pre >{JSON.stringify(blog, null, 2)}</pre>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

