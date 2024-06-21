

import { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import useAxiosHook from '../../../../UseHook/UseAxiosHook';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import UseAuth from '../../../../UseHook/UseAuth';
// import useAxiosHook from './useAxiosHook'; // Update the path as necessary

const AddProducts = () => {
  const { user } = UseAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const forms = location.state || '/deshbord/myproducts'
  const [tags, setTags] = useState([]);
  const axios = useAxiosHook();
  const timestamp = Date.now();
  // Debugging: Check if axios is correctly imported
  console.log('Axios Instance:', axios);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
 
  const handleAddition = (tag) => {

    const formattedTag = { id: tag.id, text: `#${tag.text}` };
    setTags([...tags, formattedTag]);
  };

  const handleAddProducts = (event) => {
    event.preventDefault();
    const tagsList = tags.map(tag => tag.text);
    const form = event.target;
    const productsName = form.productsName.value;
    const productsImg = form.productsImg.value;
    const description = form.descriptions.value;
    const displayName = user.displayName;
    const ownerEmail = form.ownerEmail.value;
    const photoURL = user.photoURL;
    const externalLinks = form.externalLinks.value;
    const email = user.email;

    const addProducts = {
      productsName, productsImg, description, displayName, ownerEmail, photoURL, externalLinks, tags: tagsList, timestamp: timestamp, email,
    };

    console.log(addProducts);

    axios.post('/addproductse', addProducts)
      .then(response => {
        if (response.data.insertedId) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product added successfully',
            showConfirmButton: false,
            timer: 1500
          });
          navigate(forms)
        }
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <div className=" w-full bg-[#ffef]">
        <div className=" w-full m-auto">
          <div className=" md:w-full shadow-2xl bg-base-100">
            <form onSubmit={handleAddProducts} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Products Name*</span>
                </label>
                <input type="text" name="productsName" placeholder="Please type your Products Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Products Img*</span>
                </label>
                <input type="url" name="productsImg" placeholder="Type your products img url" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description*</span>
                </label>
                <input type="text" name="descriptions" placeholder="Type your products Description" className="input input-bordered" required />
              </div>
              <h2 className="text-center text-xl font-extrabold italic underline">Products Owner Info</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Owner Name*</span>
                </label>
                <input type="text" name="ownerName" defaultValue={user?.displayName
                } placeholder="Owner Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Owner IMG*</span>
                </label>
                <input type="url" name="ownerImg" defaultValue={user?.photoURL} placeholder="Owner img url" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Owner Email*</span>
                </label>
                <input type="email" name="ownerEmail" defaultValue={user?.email} placeholder="Owner Email" className="input input-bordered" required />
              </div>
              <div className="form-control">

                <div className='w-full border border-black p-2'>
                  <ReactTags
                    tags={tags.length ? tags : [{ id: "Pending", text: "#add your tag" }]}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="inline"
                    allowDragDrop={false}
                    placeholder="Add new tag"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">External Links</span>
                </label>
                <input type="url" name="externalLinks" placeholder="Type your External Links" className="input input-bordered" />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;

