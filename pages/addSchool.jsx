import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

// Form validation schema using yup
const schema = yup.object({
  name: yup.string().required('School name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  contact: yup.string().matches(/^[0-9]+$/, "Contact number must be only digits").min(10, 'Contact must be at least 10 digits').required('Contact is required'),
  email_id: yup.string().email('Invalid email format').required('Email is required'),
  image: yup.mixed().required('An image is required')
    .test('fileSize', 'The file is too large', (value) => {
      // Check if file is provided and if its size is less than 5MB
      return value && value.length > 0 && value[0].size <= 5000000;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      // Check if file is provided and if its type is an image
      return value && value.length > 0 && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type);
    }),
}).required();

const AddSchool = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const onSubmit = async (data) => {
    setSubmissionStatus(null);
    const formData = new FormData();
    // Append all form fields to the FormData object
    for (const key in data) {
      if (key === 'image') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      // Make a POST request to your API route
      const response = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus({ message: 'School added successfully!', type: 'success' });
        reset(); // Reset the form after successful submission
      } else {
        setSubmissionStatus({ message: result.message || 'Failed to add school.', type: 'error' });
      }
    } catch (error) {
      setSubmissionStatus({ message: 'An error occurred. Please try again.', type: 'error' });
      console.error('Submission error:', error);
    }
  };

  return (
    // main container
    <div className="addSchoolMainContainer ">
      {/* navbar */}
      <div className="addSchoolNavBar">
        {/* logo */}
        <img src="" alt="logo" />
        <button className="showSchoolBtn"><a href="/showSchools">Show School</a></button>
      </div>

      {/* add school form container */}
      <div className="addSchoolFormContainer">

        {/* add school form container header */}
        <h1 className="addSchoolFormHeader">Add a New School</h1>

        {submissionStatus && (
          <div className={`p-3 rounded-md mb-4 text-center ${submissionStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submissionStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="addSchoolForm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              {...register('address')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                {...register('city')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                id="state"
                {...register('state')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              id="contact"
              {...register('contact')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>}
          </div>

          <div>
            <label htmlFor="email_id" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email_id"
              {...register('email_id')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.email_id && <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>}
          </div>

          <div class="addSchoolFormImgSubmission">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">School Image</label>
            <input
              type="file"
              id="image"
              {...register('image')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100  chooseFile"
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
          </div >
          <div className="addSchoolFormBtn"> 
            <button
              type="submit"
              className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  ">
            Add School
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddSchool;
