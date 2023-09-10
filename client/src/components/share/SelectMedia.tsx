import * as React from 'react';
import { useState, useEffect } from 'react';
import { shareFields } from '../../common/constants/formFields.ts';
import { Form } from '../../common/components/form/Form.tsx';

const SelectMedia: React.FC<ISelectMedia> = () => {
    return (
        <>
            Drag photos and videos here
            <Form buttonLabel="Select from computer" fields={shareFields} initialValues={{}} />
        </>
    );
}

export default SelectMedia;