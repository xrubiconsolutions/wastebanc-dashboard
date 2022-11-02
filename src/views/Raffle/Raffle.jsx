import React, { useEffect, useState } from "react";
import StyledButton from "../../components/UI/btn";
import DataTable from "../../components/UI/Table";
import { Tag, Space } from "antd";
import styled from "styled-components";
import tw from "twin.macro";
import { claimPermissions, truncate } from "../../utils/constants";
import RaffleModal from "../../components/UI/RaffleModal";
import Confetti from "react-confetti";
import { getClients, searchClients } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const RaffleContainer = styled.div`
  ${tw`h-screen`}
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`;
const RaffleWheel = styled.div`
  ${tw`flex items-center justify-center flex-col gap-6`}
`;
const SpinButton = styled.button`
  ${tw`opacity-50 hover:opacity-100 hover:text-white hover:border-2 hover:bg-secondary hover:text-white outline-none text-white bg-secondary rounded-lg text-lg py-2 w-1/3`}
  // height: 70px
  transition: .2s ease-in-out;
`;
const Raffle = () => {
  const [stage, setStage] = useState("stop");
  const [level, setLevel] = useState(null);
  const [start, setStart] = useState(false);

  const [winnerId, setWinnerId] = React.useState([]);
  const [confettiHasFinished, setconfettiHasFinished] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const [rowInfo, setRowInfo] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  const [paginationData, setPaginationData] = useState();

  const {
    area: { managedArea, allAreas, searchedArea },
    auth: {
      userInfo: { claims },
    },
  } = useSelector((state) => state);

  const rafflePermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.RAFFLE_DRAW.title
  );

  const checkStage = () => {
    switch (level) {
      case 0:
        setStage("high");
        break;
      case 1:
        setStage("medium");
        break;
      case 2:
        setStage("low");
        break;
      default:
        setStage("stop");
        break;
    }
  };
  const startSpin = () => {
    setStart(true);
    setLevel(0);
    checkStage();
    setTimeout(() => {
      slowSpin();
    }, 1500);
  };
  const slowSpin = () => {
    setLevel(1);
    setTimeout(() => {
      setStart(false);
      setLevel(null);
      setStage("stop");
      setShowPending(true);
    }, 1000);
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <p>{truncate(text, 10)}</p>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "LGA/LCDA",
      dataIndex: "lcd",
      key: "lcd",
      render: (text) => <p>{truncate(text, 5)}</p>,
    },
    {
      title: "USER ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <p>{truncate(text, 4)}</p>,
    },
  ];
  const { allClients } = useSelector((state) => state?.raffle);

  useEffect(() => {
    if (!allClients) {
      const payload = {
        page: currentPage,
      };
      dispatch(getClients(payload));
    } else {
      setBodyData(allClients?.users);
    }
  }, []);

  useEffect(() => {
    const payload = {
      page: currentPage,
    };
    dispatch(getClients(payload));
  }, [currentPage]);

  // useEffect(() => {
  //   // const clientsData = allClients?.sort((a, b) => {
  //   //   if (a.lcd < b.lcd) {
  //   //     return -1;
  //   //   }
  //   //   if (a.lcd > b.lcd) {
  //   //     return 1;
  //   //   }
  //   //   return 0;
  //   // });
  //   setBodyData(allClients?.users);
  //   setTotalPages(allClients?.totalResult);
  // }, [allClients]);
  // const onRefresh = () => {
  //   dispatch(getClients());
  // };

  // const handleRaffleSearch = async (page = 1) => {
  //   const res = await dispatch(
  //     getClients({
  //       page,
  //     })
  //   );
  //   if (!res.error) {
  //     const { users, ...paginationData } = res.payload.data;
  //     setBodyData(users);
  //     setPaginationData({ ...paginationData, page });
  //     setTotalPages(paginationData.totalPages);
  //   }
  // };

  const handleRaffleSearch = async (searchQuery, page) => {
    const res = await dispatch(
      searchClients({
        searchQuery: searchQuery || "",
      })
    );
    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, searchQuery });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getClients({
        page,
      })
    );
    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, page });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      {showPending ? (
        <Confetti
          style={{
            display: "block",
            position: "absolute",
            zIndex: 90000000,
            width: "100%",
          }}
          recycle={false}
          // numberOfPieces="1500"
          width={1080}
          height={800}
          onConfettiComplete={() => {
            setconfettiHasFinished(true);
          }}
        />
      ) : (
        ""
      )}
      <RaffleModal
        showPending={showPending}
        setShowPending={setShowPending}
        data={rowInfo}
        userData={rowInfo}
      />
      <RaffleContainer>
        <div className="overflow-y-scroll">
          <DataTable
            raffle
            data={bodyData}
            onRefresh={onRefresh}
            setCurrentPage={setCurrentPage}
            totalPages={paginationData?.totalPages}
            columns={columns}
            refreshUrl="drop-off"
            header
            onSearch={handleRaffleSearch}
            paginationData={paginationData}
          />
        </div>
        {rafflePermissions?.create && (
          <RaffleWheel>
            <img
              src="/assets/images/Raffle.svg"
              className={
                start
                  ? "raffle"
                  : stage === "medium"
                  ? "medium-raffle"
                  : "normal"
              }
              alt="raffledraw"
              // width="100%"
            />
            <SpinButton
              onClick={() => {
                startSpin();
              }}
            >
              Start Raffle
            </SpinButton>
          </RaffleWheel>
        )}
      </RaffleContainer>
    </>
  );
};

export default Raffle;
