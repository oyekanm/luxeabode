export const buildingFormFields = [
  {
    name: 'name',
    label: 'Building Name',
    type: 'text',
    placeholder: 'Enter building name',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'Enter building description',
    required: true
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    placeholder: 'Enter building address',
    required: true
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter building city',
    required: true
  },
  {
    name: 'state',
    label: 'State',
    type: 'text',
    placeholder: 'Enter building state',
    required: true
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    placeholder: 'Enter building country',
    required: true,
    options: [
      { value: 'Nigeria', label: 'Nigeria' }
    ]
  },
  {
    name: 'checkInTime',
    label: 'Check-in Time (click the clock icon)',
    type: 'time',
    placeholder: 'Enter check-in time',
    required: true
  },
  {
    name: 'checkOutTime',
    label: 'Check-out Time (click the clock icon)',
    type: 'time',
    placeholder: 'Enter check-out time',
    required: true
  },
  {
    name: 'minStayNights',
    label: 'Minimum Stay Nights',
    type: 'text',
    placeholder: 'Enter minimum stay nights',
    required: false
  },
]
