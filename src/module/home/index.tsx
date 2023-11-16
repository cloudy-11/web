import { FC } from "react"

import { Card } from "@/component/card"

const GridItem: FC = () => {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    return (
      <Card key={item} height={100}>
        <div className="flex flex-col">
          <div className="text-md font-medium">{"String"}</div>
        </div>
      </Card>
    )
  })
  return <div className="w-full grid grid-cols-4 gap-4">{list}</div>
}

const HomeIndex: FC = () => {
  return (
    <div className="max-w-[1200px] w-full mt-[80px] flex flex-col gap-12 py-8">
      <div className="gap-4 w-full px-8">
        <div className="text-lg font-medium">{"ELEMENTARY"}</div>
        <GridItem />
      </div>
      <div className="gap-4 w-full px-8">
        <div className="text-lg font-medium">{"INTERMEDIATE"}</div>
        <GridItem />
      </div>
      <div className="gap-4 w-full px-8">
        <div className="text-lg font-medium">{"ADVANCED"}</div>
        <GridItem />
      </div>
    </div>
  )
}
export default HomeIndex
