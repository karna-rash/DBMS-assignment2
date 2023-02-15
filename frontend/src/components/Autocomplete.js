

function Autocomplete(props)
{
    let matches = props.tags

return (
    <div>

      { matches.map((match)=> (
        <div>
           {match.tag_name}
        </div>
       ))
       }
    </div>
)

}

export default Autocomplete;