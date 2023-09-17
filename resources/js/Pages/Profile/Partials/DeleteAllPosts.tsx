import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionSection from '@/Components/ActionSection';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '/toastify-custom.css'
import axios from 'axios';
import { setApiAxiosHeader } from '@/Components/Helper/ApiTokenManager';

export default function DeleteAllPosts() {
  const route = useRoute();
  const [confirmingPostsDeletion, setconfirmingPostsDeletion] = useState(false);
  const [postCount, setPostCount] = useState(0); // Initialize with 0

  const fetchPostCount = async () => {
    try {
        setApiAxiosHeader();
      const response = await axios.get(`/api/numPosts`);
      return response.data.numPosts;
    } catch (error) {
      console.error('Error fetching post count:', error);
      return 0;
    }
  };

  const handleDeleteAllPosts = async () => {
    try {
      await axios.delete('/api/deleteAllPosts');
      toast.dark('Successfully deleted all your posts!', {
        position: toast.POSITION.TOP_CENTER,
        style: {
          color: "#000000",
          backgroundColor: "#f3f4f6",
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }});
        closeModal();
      // You might want to refresh the page or update the post count after deletion
    } catch (error) {
      console.error('Error deleting posts:', error);
      setconfirmingPostsDeletion(false);
      toast.dark('Error occurred!', {
        position: toast.POSITION.TOP_CENTER,
        style: {
          color: "#000000",
          backgroundColor: "#f3f4f6",
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }});
    }
  };

  function closeModal() {
    setconfirmingPostsDeletion(false);
  }

  return (
    <ActionSection
      title={'Delete All Your Posts'}
      description={'Permanently delete your posts.'}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        Once your posts are deleted, all of the resources and comments will be
        permanently deleted. Before deleting all your posts, please download any
        data or information that you wish to retain.
      </div>

      <div className="mt-5">
        <DangerButton 
        onClick={async () => {
            const count = await fetchPostCount();
            setPostCount(count);
            setconfirmingPostsDeletion(true);
        }} 
        >
            Delete All Posts
        </DangerButton>
      </div>

      {/* <!-- Delete Account Confirmation Modal --> */}
      <DialogModal isOpen={confirmingPostsDeletion} onClose={closeModal}>
        <DialogModal.Content title={'Delete All Your ' + postCount + ' Posts'}>
          Are you sure you want to delete all your posts? Once your posts are 
          deleted, all of the resources and comments will be permanently deleted.
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <DangerButton
            onClick={() => handleDeleteAllPosts()}
            className={classNames('ml-2')}
          >
            Delete All Posts
          </DangerButton>
        </DialogModal.Footer>
      </DialogModal>
      <ToastContainer />
    </ActionSection>
  );
}
