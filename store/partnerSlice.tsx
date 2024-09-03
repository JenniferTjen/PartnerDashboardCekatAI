// authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '@/utils/http';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';
const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/partner`;

interface ProfileState {
    isLogin: boolean;
    user: any;
    loading: string;
}

const initialState: ProfileState = {
    isLogin: false,
    user: null,
    loading: '',
};

export const loginUser = createAsyncThunk('partner/loginUser', async (payload: any, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password,
        });
        return data;
    } catch (error) {
        throw rejectWithValue(error);
    }
});

export const getBusinessData = createAsyncThunk('partner/getBusinessData', async () => {
    try {
        const response = await http.get(`${endpoint}/business-data`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

export const getAllBusiness = createAsyncThunk('partner/getAllBusiness', async () => {
    try {
        const response = await http.get(`${endpoint}/all-business`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

export const getTemplates = createAsyncThunk('partner/getTemplates', async () => {
    try {
        const response = await http.get(`${endpoint}/templates`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

export const createNewBusiness = createAsyncThunk('partner/createNewBusiness', async (payload: any) => {
    try {
        const response = await http.post(`${endpoint}/register-business`, payload);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

export const updatePartner = createAsyncThunk(
    'partner/updatePartner',
    async (payload: any, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            Object.keys(payload).forEach(key => {
                if (key === 'logo' && payload[key] instanceof File) {
                    formData.append('logo', payload[key] as File);
                } else {
                    formData.append(key, payload[key] as string);
                }
            });

            const response = await http.put(`${endpoint}/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const getPartnerDetail = createAsyncThunk('partner/getPartnerDetail', async () => {
    try {
        const response = await http.get(`${endpoint}/self-details`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

const partnerSlice = createSlice({
    name: 'partner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.isLogin = true;
            state.user = action.payload.user;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(getBusinessData.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(getBusinessData.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(getBusinessData.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(getAllBusiness.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(getAllBusiness.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(getAllBusiness.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(getTemplates.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(getTemplates.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(getTemplates.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export default partnerSlice.reducer;
