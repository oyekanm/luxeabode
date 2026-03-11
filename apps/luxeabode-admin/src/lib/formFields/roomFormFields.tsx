export const roomFormFields = [
    {
        name: 'name',
        label: 'Room Name',
        type: 'text',
        placeholder: 'Enter room name',
        required: true
    },
    {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Enter room description',
        required: true
    },
    {
        name: 'type',
        label: 'Room Type',
        type: 'select',
        placeholder: 'Select room type',
        required: true,
        options: [
            { value: 'single', label: 'Single' },
            { value: 'double', label: 'Double' },
            { value: 'mini-suite', label: 'Mini Suite (1 bedroom + small living area)' },
            { value: 'suite', label: 'Suite (1 bedroom + 1 living room)' },
            { value: 'studio', label: 'Studio (1 room with bed, sitting area & kitchenette)' },
            { value: 'penthouse', label: 'Penthouse (top floor apartment with private terrace)' },
        ]
    },
    {
        name: 'bookingMode',
        label: 'Booking Mode',
        type: 'select',
        placeholder: 'Select booking mode',
        required: true,
        options: [
            { value: 'room_only', label: 'Room Only' },
            { value: 'apartment_only', label: 'Apartment Only(Entire apartment)' },
            { value: 'both', label: 'Both (Entire apartment / room)' },
        ]
    },

    {
        name: 'bathrooms',
        label: 'Bathrooms',
        type: 'text',
        placeholder: 'Enter bathrooms',
        required: true
    },
    {
        name: 'hasSittingRoom',
        label: 'Does the room have a sitting room?',
        type: 'boolean',
        placeholder: 'Select yes or no',
        required: true
    },

]

export const priceFields = [
    {
        name: 'nightlyRate',
        label: 'Price Per night',
        type: 'text',
        placeholder: 'Enter price per night',
        required: true
    },
    {
        name: 'monthlyRate',
        label: 'Price Per month',
        type: 'text',
        placeholder: 'Enter price per month',
        required: false
    },
    {
        name: 'maxGuests',
        label: 'Maximum Guests',
        type: 'text',
        placeholder: 'Enter maximum guests',
        required: true
    },
    {
        name: 'bedrooms',
        label: 'Number of bedrooms',
        type: 'text',
        placeholder: 'Enter bedrooms',
        required: true
    },
]