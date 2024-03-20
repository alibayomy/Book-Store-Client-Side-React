import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("general");

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container container-p-y mb-4">
      <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
      <div className="card mx-auto overflow-hidden bg-white rounded shadow">
        <div className="row">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a
                className={`list-group-item list-group-item-action ${
                  activeTab === "general" ? "active" : ""
                }`}
                onClick={() => handleTabChange("general")}
                href="#account-general"
              >
                General
              </a>
              <a
                className={`list-group-item list-group-item-action ${
                  activeTab === "info" ? "active" : ""
                }`}
                onClick={() => handleTabChange("info")}
                href="#account-info"
              >
                Update Profile
              </a>
              <a
                className={`list-group-item list-group-item-action ${
                  activeTab === "password" ? "active" : ""
                }`}
                onClick={() => handleTabChange("password")}
                href="#account-change-password"
              >
                Change password
              </a>
            </div>
          </div>
          <div className="col-md-9 p-4">
            <div className="tab-content">
              <div
                className={`tab-pane fade ${
                  activeTab === "general" ? "active show" : ""
                }`}
                id="account-general"
              >
                {/* General content */}
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="rounded w-75"
                      />
                    </div>
                    <div className="col-8">
                      <div className="row mb-2">
                        <div className="form-group col-6">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control mb-1"
                            defaultValue="Mohamed"
                            readOnly
                          />
                        </div>
                        <div className="form-group col-6">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Nasser"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control mb-1"
                          defaultValue="nasser@gmail.com"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "info" ? "active show" : ""
                }`}
                id="account-info"
              >
                {/* Info content */}
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="rounded w-75"
                      />
                    </div>
                    <div className="col-8">
                      <div className="row mb-2">
                        <div className="form-group col-6">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control mb-1"
                            defaultValue="Mohamed"
                          />
                        </div>
                        <div className="form-group col-6">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Nasser"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-2">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control mb-1"
                          defaultValue="nasser@gmail.com"
                          readOnly
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="+0 (123) 456 7891"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Profile</label>
                        <input type="file" className="form-control" />
                      </div>
                      <div className="text-right mt-4">
                        <button type="button" className="filled-button">
                          Save changes
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-default">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "password" ? "active show" : ""
                }`}
                id="account-change-password"
              >
                {/* Change password content */}
                <div className="card-body pb-2">
                  <div className="form-group mb-3">
                    <label className="form-label">Current password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">New password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Repeat new password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="text-right mt-4">
                    <button type="button" className="filled-button">
                      Save changes
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-default">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
