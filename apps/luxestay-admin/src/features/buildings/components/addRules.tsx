import type { CreateApartmentInput } from '@/lib/validators/building'
import FunctionalButton from '@repo/ui/functionalButton'
import InputLabel from '@repo/ui/inputLabel'
import InputText from '@repo/ui/inputText'
import { Plus, Trash } from 'lucide-react'
import React from 'react'
import { useFieldArray, type UseFormReturn } from 'react-hook-form'

interface RuleProps{
    form:UseFormReturn<CreateApartmentInput >
}

export default function AddRules({form}:RuleProps) {
   const rules = form.watch("rules") || []
   console.log(rules)

   const onChange = (e:React.ChangeEvent<HTMLInputElement>, idx:number)=>{
    console.log(e.target.value)
const allRules = [...rules]
allRules[idx] = e.target.value
    form.setValue("rules", [...allRules])
   }

   const removeRule = (idx:number)=>{
    const allRules = [...rules]
    allRules.splice(idx, 1)
    form.setValue("rules", [...allRules])
   }

   
  return (
    <div>
        <div className='space-y-4'>
            <InputLabel title={"Add the rules and regulations for this apartment building"} />
        {
            rules.map((rule, idx)=>{

                const field = {
    value:rule,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>onChange(e, idx)
   }
                return (
                  <div className='relative'>
                      <InputText
                    key={idx}
                                        placeholder={"add a rule to abide by"}
                                        field={field}
                                        type={"text"}
                                        className='pr-10'
                                      />
                                      <Trash className='icon-size text-red-500 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2' onClick={()=>removeRule(idx)} />
                  </div>
                )
            })
        }
        <FunctionalButton type='button'   className='flex items-center gap-2' click={()=>form.setValue("rules", [...rules, ""]) }>
            <Plus className='icon-size' />
            Add Amenity
        </FunctionalButton>
        </div>
    </div>
  )
}
