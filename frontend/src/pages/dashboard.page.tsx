import React, { FC, useState, useEffect } from "react";

import { RouteComponentProps } from "@reach/router";
import { IUserProps } from "../dtos/user.dto";
import { UserCard } from "../components/users/user-card";
import { CircularProgress } from "@mui/material";

import { BackendClient } from "../clients/backend.client";

const backendClient = new BackendClient();

export const DashboardPage: FC<RouteComponentProps> = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const fetchData = async (page: number) => {
    setLoading(true);
    const result = await backendClient.getAllUsers(page);
    setTotalPages(new Array(result.pagination.totalPages));
    setCurrrentPage(result.pagination.page);
    setUsers(result.data);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size="60px" />
          </div>
        ) : (
          <div>
            {users.length
              ? users.map((user) => {
                  return <UserCard key={user.id} {...user} />;
                })
              : null}
              <div>
                <button
                  disabled={currentPage <= 1}
                  onClick={() => fetchData(currentPage - 1)}
                >back</button>
                <button
                  disabled={currentPage >= totalPages.length}
                  onClick={() => fetchData(currentPage + 1)}
                >next</button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
