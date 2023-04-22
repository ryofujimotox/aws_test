import React, { useState, useCallback, memo } from "react";
import useSWR from 'swr'

const fetcher = (...args: any) => {
  console.log("load");

  return fetch(...args).then(res => res.json());
}

const Profile = memo(() => {
  const { data, error, isLoading } = useSWR('https://gy3zydeqy7.execute-api.ap-northeast-1.amazonaws.com/default/python_test', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // データをレンダリングする
  return <div>{data}</div>
})


const main = memo(() => {
  return (
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
  )
})

export default main