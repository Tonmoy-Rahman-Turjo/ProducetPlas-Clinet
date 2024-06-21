import { useEffect, useState } from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import useAxiosHook from '../../../../UseHook/UseAxiosHook';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import UseAuth from '../../../../UseHook/UseAuth';

const Update = () => {
    const { user } = UseAuth();
    const axios = useAxiosHook();
    const { id } = useParams();
    const [tags, setTags] = useState([]);
    const [update, setUpdate] = useState({});

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
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

        const updatedProduct = { productsName, productsImg, description, displayName, ownerEmail, photoURL, externalLinks, tags: tagsList, email };

        axios.put(`/deshbord/myproduct/update/${id}`, updatedProduct)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Update successful',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    });
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Update failed',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            });
    };

    useEffect(() => {
        axios.get(`/deshbord/myproduct/update/${id}`)
            .then(res => {
                setUpdate(res.data);
                setTags(res.data.tags.map(tag => ({ id: tag, text: tag })));
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [id, axios]);

    return (
        <div className="w-full bg-[#ffef]">
            <div className="w-full m-auto">
                <div className="md:w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleAddProducts} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Products Name*</span>
                            </label>
                            <input
                                type="text"
                                name="productsName"
                                defaultValue={update.productsName}
                                placeholder="Please type your Products Name"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Products Img*</span>
                            </label>
                            <input
                                type="url"
                                name="productsImg"
                                defaultValue={update.productsImg}
                                placeholder="Type your products img url"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description*</span>
                            </label>
                            <input
                                type="text"
                                name="descriptions"
                                defaultValue={update.description}
                                placeholder="Type your products Description"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <h2 className="text-center text-xl font-extrabold italic underline">Products Owner Info</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Owner Name*</span>
                            </label>
    
    <input type="text" name="ownerName" defaultValue={update.ownerName}  placeholder="Owner Name" className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Owner IMG*</span>
                            </label>
                            <input  type="url" name="ownerImg"  defaultValue={update.photoURL}placeholder="Owner img url"className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Owner Email*</span>
                            </label>
                            <input
                                type="email"
                                name="ownerEmail"
                                defaultValue={update.email}
                                placeholder="Owner Email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <div className='w-full'>
                                <ReactTags
                                defaultValue={update.tagsList} tags={tags} handleDelete={handleDelete} handleAddition={handleAddition}
                                    inputFieldPosition="inline" allowDragDrop={false}placeholder="Add new tag"
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">External Links</span>
                            </label>
                            <input
                                type="url"
                                name="externalLinks"
                                defaultValue={update.externalLinks}
                                placeholder="Type your External Links"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;

