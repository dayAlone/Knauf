import React from 'react'

import { InputString, InputText, InputLink, InputImage, InputToggle } from '../components/TextEditor/fields'

const getEditComponent = (el) => {
    switch (el.type) {
    case 'html':
        return <InputText el={el} />
    case 'link':
        return <InputLink el={el} />
    case 'image':
        return <InputImage el={el} />
    case 'boolean':
        return <InputToggle el={el} />
    default:
        return <InputString el={el} />
    }
}
export default getEditComponent
