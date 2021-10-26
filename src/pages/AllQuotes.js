import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getAllQuotes } from "../lib/api";


const AllQuotes=()=>{
    const {sendRequest,status,data:loadedQuates,error}=useHttp(getAllQuotes,true)

    useEffect(()=>{
        sendRequest();
    },[sendRequest])

    if(status==='pending')
    {
        return(
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }

    if(error)
    {
        return <div className='centered focused'>{error}</div>
    }

    if(status==='completed' && (!loadedQuates || loadedQuates.length === 0))
    {
        return  <NoQuotesFound/>
    }
    return(
        <QuoteList quotes={loadedQuates}/>
    )
}

export default AllQuotes;