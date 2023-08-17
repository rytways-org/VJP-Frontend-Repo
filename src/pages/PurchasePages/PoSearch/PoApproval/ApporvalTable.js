import React from "react";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import { AiOutlinePullRequest, AiOutlineReconciliation } from "react-icons/ai";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  // InputGroup,
  // FormControl
} from "react-bootstrap";
// This is the table constant/settings which needed to render table elements

export const ApprovalTable = (handleEdit, actions, roleId) => {
  return [
    {
      title: "Prepared By",
      align: "center",
      render: (rowData) => {
        return (
          <>
            {" "}
            {Number(rowData.statusState) == 0 &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) == 3 && (
                <>
                  <Button
                    variant="primary"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 1, 0)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 1, 1)}
                  >
                    Reject
                  </Button>{" "}
                </>
              )}
            {Number(rowData.statusState) == 0 &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) != 3 && <span>Yet To Approve</span>}
            {Number(rowData.statusState) >= 1 &&
              Number(rowData.isRejected) == 0 && (
                <span>
                  {rowData.approver1}
                  <br />
                  {rowData.poApproval1}
                  <br />
                </span>
              )}
            {rowData.isRejected == 1 && (
              <span>
                Rejected By <br />
                {rowData.approver1}
                <br />
                {rowData.poApproval1}
              </span>
            )}
          </>
        );
      },
    },
    {
      title: "Schritanised By",
      align: "center",
      render: (rowData) => {
        return (
          <>
            {Number(rowData.statusState) >= 1 &&
              rowData.approver2 == "" &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) == 4 && (
                <>
                  <Button
                    variant="primary"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 2, 0)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 2, 1)}
                  >
                    Reject
                  </Button>{" "}
                </>
              )}

            {Number(rowData.statusState) >= 1 &&
              Number(rowData.statusState) <= 3 &&
              rowData.approver2 == "" &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) != 4 && <span>Yet To Approve</span>}

            {rowData.approver2 != "" && Number(rowData.isRejected) == 0 && (
              <span>
                Approved By <br />
                {rowData.approver2}
                <br />
                {rowData.poApproval2}
              </span>
            )}

            {rowData.approver2 != "" &&
              Number(rowData.isRejected) === 1 &&
              rowData.rejectedState === 2 && (
                <span>
                  Rejected By <br />
                  {rowData.approver2}
                  <br />
                  {rowData.poApproval2}
                </span>
              )}

            {rowData.approver2 != "" &&
              Number(rowData.isRejected) === 1 &&
              rowData.rejectedState !== 2 && (
                <span>
                  Approved By <br />
                  {rowData.approver2}
                  <br />
                  {rowData.poApproval2}
                </span>
              )}
          </>
        );
      },
    },
    {
      title: "Verified By",
      align: "center",
      render: (rowData) => {
        return (
          <>
            {Number(rowData.statusState) >= 1 &&
              rowData.approver3 == "" &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) == 5 && (
                <>
                  <Button
                    variant="primary"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 3, 0)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 3, 1)}
                  >
                    Reject
                  </Button>{" "}
                </>
              )}

            {Number(rowData.statusState) >= 1 &&
              Number(rowData.statusState) <= 3 &&
              rowData.approver3 == "" &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) != 5 && <span>Yet To Approve</span>}

            {rowData.approver3 != "" && Number(rowData.isRejected) == 0 && (
              <span>
                Approved By <br />
                {rowData.approver3}
                <br />
                {rowData.poApproval3}
              </span>
            )}

            {rowData.approver3 != "" &&
              Number(rowData.isRejected) === 1 &&
              rowData.rejectedState === 3 && (
                <span>
                  Rejected By <br />
                  {rowData.approver3}
                  <br />
                  {rowData.poApproval3}
                </span>
              )}

            {rowData.approver3 != "" &&
              Number(rowData.isRejected) === 1 &&
              rowData.rejectedState !== 3 && (
                <span>
                  Approved By <br />
                  {rowData.approver3}
                  <br />
                  {rowData.poApproval3}
                </span>
              )}
          </>
        );
      },
    },
    {
      title: "Certified By",
      align: "center",
      render: (rowData) => {
        return (
          <>
            {Number(rowData.statusState) >= 3 &&
              Number(rowData.statusState) < 5 &&
              rowData.approver4 == "" &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) == 6 && (
                <>
                  <Button
                    variant="primary"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 4, 0)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 4, 1)}
                  >
                    Reject
                  </Button>{" "}
                </>
              )}

            {Number(rowData.statusState) >= 1 &&
              Number(rowData.statusState) < 5 &&
              rowData.approver4 == "" &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) != 6 && <span>Yet To Approve</span>}

            {rowData.approver4 != "" && Number(rowData.isRejected) == 0 && (
              <span>
                Approved By <br />
                {rowData.approver4}
                <br />
                {rowData.poApproval4}
              </span>
            )}

            {rowData.approver4 != "" &&
              Number(rowData.isRejected) === 1 &&
              rowData.rejectedState === 4 && (
                <span>
                  Rejected By <br />
                  {rowData.approver4}
                  <br />
                  {rowData.poApproval4}
                </span>
              )}

            {rowData.approver4 != "" &&
              Number(rowData.isRejected) === 1 &&
              rowData.rejectedState !== 4 && (
                <span>
                  Approved By <br />
                  {rowData.approver4}
                  <br />
                  {rowData.poApproval4}
                </span>
              )}
          </>
        );
      },
    },
    {
      title: "Authorised By",
      align: "center",
      render: (rowData) => {
        return (
          <>
            {Number(rowData.statusState) >= 3 &&
              Number(rowData.statusState) < 5 &&
              rowData.approver5 == "" &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) == 7 && (
                <>
                  <Button
                    variant="primary"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 5, 0)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={handleEdit(rowData, 5, 1)}
                  >
                    Reject
                  </Button>{" "}
                </>
              )}

            {Number(rowData.statusState) >= 1 &&
              Number(rowData.statusState) < 5 &&
              rowData.approver5 == "" &&
              Number(rowData.isRejected) == 0 &&
              Number(roleId) != 7 && <span>Yet To Approve</span>}

            {rowData.approver5 != "" && Number(rowData.isRejected) == 0 && (
              <span>
                Approved By <br />
                {rowData.approver5}
                <br />
                {rowData.poApproval5}
              </span>
            )}

            {rowData.approver5 != "" &&
              Number(rowData.isRejected) === 1 &&
              rowData.rejectedState === 5 && (
                <span>
                  Rejected By <br />
                  {rowData.approver5}
                  <br />
                  {rowData.poApproval5}
                </span>
              )}

            {rowData.approver5 != "" &&
              Number(rowData.isRejected) === 1 &&
              rowData.rejectedState !== 5 && (
                <span>
                  Approved By <br />
                  {rowData.approver5}
                  <br />
                  {rowData.poApproval5}
                </span>
              )}
          </>
        );
      },
    },
  ];
};

export default ApprovalTable;
