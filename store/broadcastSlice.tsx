import http from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/broadcast`;

interface ProfileState {
    isLogin: boolean;
    profile: any;
    loading: string;
}

const initialState: ProfileState = {
    isLogin: false,
    profile: {
        name: '',
        email: '',
        role: '',
        business_id: '',
    },
    loading: '',
};

export const sendBroadcastEmail = createAsyncThunk('partner/sendBroadcastEmail', async (payload: any) => {
    try {
        const response = await http.post(`${endpoint}/send-email`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const sendBroadcastWhatsapp = createAsyncThunk('partner/sendBroadcastWhatsapp', async (payload: any) => {
    try {
        const response = await http.post(`${endpoint}/send-whatsapp`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getEmailBroadcastHistory = createAsyncThunk('partner/emailBroadcastHistory', async () => {
    try {
        const response = await http.get(`${endpoint}/email-broadcast-history`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

const broadtcastSlice = createSlice({
    name: 'broadcast',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendBroadcastEmail.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(sendBroadcastEmail.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(sendBroadcastEmail.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(sendBroadcastWhatsapp.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(sendBroadcastWhatsapp.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(sendBroadcastWhatsapp.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export default broadtcastSlice.reducer;
