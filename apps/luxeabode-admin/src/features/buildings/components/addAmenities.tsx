// import type { CreateApartmentInput } from '@/lib/validators/building'
// import { useFormContext } from '@repo/ui/form'
// import FunctionalButton from '@repo/ui/functionalButton'
// import InputLabel from '@repo/ui/inputLabel'
// import InputText from '@repo/ui/inputText'
// import { Plus, Trash } from 'lucide-react'
// import React from 'react'


// export default function AddAmenities() {
//    const form = useFormContext<CreateApartmentInput>()
//    const amenities = form.watch("amenities")

//    const onChange = (e:React.ChangeEvent<HTMLInputElement>, idx:number)=>{
//     console.log(e.target.value)
// const allAmenities = [...amenities]
// allAmenities[idx] = e.target.value
//     form.setValue("amenities", [...allAmenities])
//    }

//    const removeAmenity = (idx:number)=>{
//     const allAmenities = [...amenities]
//     allAmenities.splice(idx, 1)
//     form.setValue("amenities", [...allAmenities])
//    }

   
//   return (
//     <div>
//         <div className='space-y-4'>
//             <InputLabel title={"Add the amenities available in this apartment building"} />
//         {
//             amenities.map((amenity, idx)=>{

//                 const field = {
//     value:amenity,
//     onChange:(e:React.ChangeEvent<HTMLInputElement>)=>onChange(e, idx)
//    }
//                 return (
//                   <div className='relative'>
//                       <InputText
//                     key={idx}
//                                         placeholder={"add an amenity"}
//                                         field={field}
//                                         type={"text"}
//                                         className='pr-10'
//                                       />
//                                       <Trash className='icon-size text-red-500 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2' onClick={()=>removeAmenity(idx)} />
//                   </div>
//                 )
//             })
//         }
//         <FunctionalButton type='button'   className='flex items-center gap-2' click={()=>form.setValue("amenities", [...amenities, ""]) }>
//             <Plus className='icon-size' />
//             Add Amenity
//         </FunctionalButton>
//         </div>
//     </div>
//   )
// }
