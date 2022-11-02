import { Tabs, Button } from "antd";
import DataTable from "./Table";
import tw from "twin.macro";
import styled from "styled-components";

const { TabPane } = Tabs;

// const operations = <Button>Extra Action</Button>;
// function callback(key) {
//   // console.log(key);
//   const mode = e.target.value;
//     // this.setState({ mode });
//     console.log("mode", mode);
// }

const TabContainer = styled.div`
  ${tw`p-3 mt-4`}
  background-color: white!important;
`;
const Tabcontent = ({
  data,
  onRefresh,
  totalPages,
  setCurrentPage,
  onSwitch,
  noFilter,
}) => {
  const callback = (key) => {
    onSwitch(key);
  };

  return (
    <TabContainer>
      <Tabs defaultActiveKey="0" onChange={callback}>
        {data.map((el, i) => {
          return (
            <TabPane tab={el.title} key={i}>
              <DataTable
                data={el.data}
                columns={el.columns}
                refreshUrl={el.link}
                onFilter={el.filterHandler}
                onSearch={el.searchHandler}
                onFetch={el.fetch}
                header
                onRefresh={onRefresh}
                totalPages={el.totalPages || totalPages}
                setCurrentPage={setCurrentPage}
                noFilter={noFilter}
                paginationData={el.paginationData}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </TabContainer>
  );
};
export default Tabcontent;
