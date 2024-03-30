import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "lib/api";

const companyProfile = createAsyncThunk(
  'company/profile',
  async (data) => {
    try {
      const response = await api.get(`company/profile/${data}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

const companyProfilePage = createAsyncThunk(
  'company/profile/page',
  async (data) => {
    try {
      const response = await api.post(`company/profile`, data,  {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

const memberVisitProfile = createAsyncThunk(
  'member/visit-profile',
  async (data) => {
    try {
      const response = await api.post(`member/visit-profile`, data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

const companyList = createAsyncThunk(
  'company/list',
  async (data) => {
    try {
      const response = await api.post(`company/list`, data, {

      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

const companyListParms = createAsyncThunk(
  'company/list/parms',
  async (data) => {
    try {
      const response = await api.post(`company/list`, data, {

      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)


const getInfoByBranch = createAsyncThunk(
  'company/get-info-by-branch',
  async (data) => {
    try {
      const response = await api.post(`company/get-info-by-branch`, data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)


const getBranches = createAsyncThunk(
  'company/get-branches',
  async (data) => {
    try {
      const response = await api.post(`company/get-branches`, data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

const getCBranches = createAsyncThunk(
  'company/get-cbranches',
  async (data) => {
    try {
      const response = await api.post(`company/get-cbranches`, data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)


const addBranches = createAsyncThunk(
  'company/add-branch/as',
  async (data) => {
    try {
      const response = await api.post(`company/add-branch`, data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

const getContinent = createAsyncThunk(
  'loctaions/region-list',
  async (data) => {
    console.log('contenten',data)
    try {
      const response = await api.post(`loctaions/region-list`, {}, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)



const getQueryContinent = createAsyncThunk(
  'loctaions/region-query-list',
  async (data) => {
    console.log('contenten',data)
    try {
      const response = await api.post(`loctaions/region-list?country=${data}`, {}, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)


export {
  companyProfile,
  companyProfilePage,
  memberVisitProfile,
  companyListParms,
  getInfoByBranch,
  companyList,  
  getBranches,
  getCBranches,
  addBranches,
  getContinent,
  getQueryContinent
};