'use'
import Edittodo from '@/common/module/dashboard/component/Edittodo'
import React from 'react'

interface EditProps {
  params: {name: string }
}

const page = ({ params }: EditProps) => {
  const { name } = params;
  return (
    <div>
     <Edittodo  />
    </div>
  )
}

export default page
