import React, { useState, useCallback, memo } from "react";
import useSWR, { SWRConfig } from 'swr'

const fetcher = (...args: any) => {
  console.log("load");

  return fetch(...args).then(res => res.json());
}

export async function getStaticProps() {
  // `getStaticProps` はサーバー側で実行されます
  // const staticdata_test = await fetcher("https://gy3zydeqy7.execute-api.ap-northeast-1.amazonaws.com/default/python_test");
  return {
    props: {
      staticProps: {
        'https://gy3zydeqy7.execute-api.ap-northeast-1.amazonaws.com/default/python_test': "staticdata_test"
      }
    }
  }
}


function usePythonD() {
  // const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)
  const options = {
    // fallbackData: props.staticdata_test
    fallbackData: "OO"
  }
  // console.log(options);

  const { data, error, isLoading } = useSWR(`https://gy3zydeqy7.execute-api.ap-northeast-1.amazonaws.com/default/python_test`, fetcher, options)

  return {
    data: data,
    error: error,
    isLoading,
  }
}

const Profile = memo((props) => {
  const { data, error, isLoading } = usePythonD(props);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // データをレンダリングする
  return <div>{data}</div>
})


const main = (({ staticProps }) => {

  return (
    <SWRConfig value={{ staticProps }}>
      <div className={""}>
        hello

        <Profile />

        {
          [...Array(100)].map((_, i) => {
            return (
              <div key={i}>
                OK
              </div>
            )
          })
        }

      </div>
    </SWRConfig>


  )
})

export default main