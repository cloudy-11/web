import { FC, useEffect } from "react"

import { useLoaderData } from "react-router-dom"
import tw from "twin.macro"

import { Card } from "@/component/card"
import { Loading } from "@/component/loading"
import CodeStore from "@/store/code"
import { Category } from "@/types/category"

const Main = tw.div`max-w-[1200px] w-full mt-[80px] flex flex-col gap-12 py-8`
const Center = tw.div`w-full h-full flex justify-center items-center`
const Section = tw.div`gap-4 w-full px-8`
const Heading = tw.div`text-lg font-medium`

const GridItem: FC<{ categories: Category[] }> = ({ categories }) => {
  const list = categories.map((item) => {
    return (
      <Card key={item.id} height={150} isLock={item.isLock}>
        <div className="flex flex-col">
          <div className="text-md font-medium">{item.name}</div>
        </div>
      </Card>
    )
  })
  return <div className="w-full grid grid-cols-4 gap-4">{list}</div>
}

const HomeIndex: FC = () => {
  const data = useLoaderData() as {
    code: Category[]
  }

  const codes = CodeStore.useStoreState((state) => state.codes)

  const setCodes = CodeStore.useStoreActions((action) => action.setCodes)

  useEffect(() => {
    if (data && data.code) {
      setCodes(data.code)
    }
  }, [])

  if (!codes) {
    return (
      <Main>
        <Center>
          <Loading size={40} />
        </Center>
      </Main>
    )
  }

  return (
    <Main>
      <Section>
        <Heading>{"ELEMENTARY"}</Heading>
        <GridItem categories={codes.filter((code) => code.level === 1)} />
      </Section>
      <Section>
        <Heading>{"INTERMEDIATE"}</Heading>
        <GridItem categories={codes.filter((code) => code.level === 2)} />
      </Section>
      <Section>
        <Heading>{"ADVANCED"}</Heading>
        <GridItem categories={codes.filter((code) => code.level === 3)} />
      </Section>
    </Main>
  )
}
export default HomeIndex
