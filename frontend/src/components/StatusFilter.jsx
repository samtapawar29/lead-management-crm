function StatusFilter({

  selectedStatus,

  setSelectedStatus,

}) {

  return (

    <div className="mb-6">

      <select

        value={selectedStatus}

        onChange={(e) =>

          setSelectedStatus(e.target.value)

        }

        className="border p-3 pr-12 rounded-lg w-full md:w-64"

      >

        <option value="All">

          All Statuses

        </option>



        <option value="New">

          New

        </option>



        <option value="Contacted">

          Contacted

        </option>



        <option value="Qualified">

          Qualified

        </option>



        <option value="Converted">

          Converted

        </option>



        <option value="Lost">

          Lost

        </option>

      </select>

    </div>

  );

}



export default StatusFilter;