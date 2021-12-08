/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import DisplaySuggestedArtists from '~/components/DisplaySuggestedArtists'
import { RiCloseFill, RiSearchLine, RiUserSearchLine } from 'react-icons/ri'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

interface TypeProps {
  host: any
  artists: any
}

const SearchArtistMenu: React.FC<TypeProps> = ({ host, artists }) => {

  const { data: fetchArtists } = useSWR('/api/artists', fetcher, {
    refreshInterval: 1000,
    fallbackData: artists
  })
  
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isDisplay, setIsDisplay] = React.useState(false)
  const [isDropdown, setIsDropdown] = React.useState(false)

  const handleChange = (e: { target: { value: any } }) => {
    setSearchTerm(e.target.value)
    if(!e.target.value) {
      setIsDisplay(false)
    } else {
      setIsDisplay(true)
    }
  }
  
  const getArtists = fetchArtists.map((artist: any) => {
    return {
      profile: artist.profile,
      name: artist.name,
      username: artist.username,
      composition: artist.composition,
      account_type: artist.account_type
    }
  })
  
  const search_results = !searchTerm ? getArtists : getArtists.filter((artist: any) => 
    artist.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  return (
    <div className="flex">
      <button
        title="Search Artists"
        className="outline-none"
        type="button"
        onClick={() => {
          setIsDropdown(true)
        }} 
      >
        <RiUserSearchLine className="w-5 h-5 transition ease-linear duration-200 text-[#848484] hover:text-pantone-white" />
      </button>
      {isDropdown && (
        <React.Fragment>
          <button 
            className={`${isDropdown ? `z-50 block fixed inset-0 w-full h-full cursor-default outline-none` : 'hidden'}`}
            type="button"
            onClick={() => {
              setIsDropdown(false)
            }} 
          />
          <div className="fixed block md:hidden inset-0 z-50">
            <div className="flex w-full max-w-full h-full overflow-auto bg-pantone-black">
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full px-3 py-2 border-b border-pantone-white border-opacity-10 bg-pantone-darkblack">
                  <span className="font-bold text-sm text-pantone-white text-opacity-50">Search Artists</span>
                  <button 
                    title="Close"
                    className="outline-none"
                    type="button"
                    onClick={() => {
                      setIsDropdown(false)
                    }} 
                  >
                    <RiCloseFill className="w-5 h-5 transition ease-linear duration-200 text-[#848484] hover:text-pantone-white" />
                  </button>
                </div>
                <div className="flex flex-col items-center w-full px-3 py-2 border-b border-pantone-white border-opacity-10">
                  <form className="z-20 flex flex-row items-center w-full max-w-full px-3 space-x-3 bg-pantone-gray rounded-lg border border-pantone-black focus-within:border-pantone-white focus-within:border-opacity-30">
                    <RiSearchLine className="text-white text-opacity-60" />
                    <input
                      type="text"
                      className="w-full py-2.5 text-xs bg-transparent outline-none"
                      placeholder="Search artist"
                      value={searchTerm}
                      onChange={handleChange}
                    />
                    <button type="submit" className="hidden" />
                  </form>
                </div>
                {isDisplay && (
                  <div className="flex flex-col w-full">
                    {search_results.length === 0 && (
                      <div className="flex px-5 py-3">
                        <span className="font-light text-xs">No results found.</span>
                      </div>
                    )}
                    {search_results.map((artist: any, i: number) => (
                      <Link href={`/${ artist.username }`} key={i}>
                        <a
                          className="flex flex-row items-center w-full space-x-2 px-3 py-3 border-b border-pantone-white border-opacity-10 bg-pantone-black hover:bg-pantone-white hover:bg-opacity-5"
                          onClick={(e: any) => {
                            setIsDisplay(false)
                            setSearchTerm(e.target.value="")
                          }}
                        >
                          <div className="flex">
                            <img
                              className="w-10 h-10 object-cover rounded-full bg-[#1D1F21]"
                              src={`${ artist.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${artist.profile[0].version}/${artist.profile[0].publicId}.${artist.profile[0].format}` : `https://ui-avatars.com/api/?name=${artist.name}&background=2B2F31&color=FF3C3C` }`}
                              alt={`${ artist.username }`}
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="font-bold text-xs">{ artist.name }</div>
                            <div className="font-light text-[10px]">
                              { artist.account_type }
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
                <div className="flex flex-col w-full">
                  <div className="flex flex-row items-center w-full px-3 py-2 border-b border-pantone-white border-opacity-10 bg-pantone-darkblack">
                    <span className="font-bold text-sm text-pantone-white text-opacity-50">Suggested Accounts</span>
                  </div>
                  <DisplaySuggestedArtists
                    host={host}
                    fetchArtists={fetchArtists}
                  />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default SearchArtistMenu