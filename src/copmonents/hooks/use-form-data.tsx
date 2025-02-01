import { ChangeEvent, useEffect, useState } from 'react';
import { FormData } from '../../utils/types';

const useFormData = (initialValue: FormData) => {
  const [formData, setFormData] = useState(initialValue);
  const [checkFormData, setCheckFormData] = useState({ status: false, field: '' });

  useEffect(() => {
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        return setCheckFormData({ status: false, field: key });
      }
    }
    setCheckFormData({ status: true, field: '' });
  }, [formData]);

  const onChangeFormData = (e: ChangeEvent<HTMLInputElement>, cb?: (e: ChangeEvent<HTMLInputElement>) => void) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (cb) cb(e);
  };

  return { formData, onChangeFormData, checkFormData, setFormData };
};

export default useFormData;
