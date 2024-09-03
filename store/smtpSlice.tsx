import http from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/smtp`;

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

export const getSmtpList = createAsyncThunk('smtp/getSmptList', async () => {
    try {
        const response = await http.get(`${endpoint}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

export const createNewSmtp = createAsyncThunk('smtp/createNewSmtp', async (payload: any) => {
    try {
        const response = await http.post(`${endpoint}/create`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteSmtp = createAsyncThunk('smtp/deleteSmtp', async (id: string) => {
    try {
        const response = await http.delete(`${endpoint}/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const editSmtp = createAsyncThunk('smtp/editSmtp', async ({ id, payload }: { id: any, payload: any }) => {
    try {
        console.log(id, "id");
        console.log(payload, 'payload')
        const response = await http.put(`${endpoint}/update/${id}`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
});


const smtpSlice = createSlice({
    name: 'smtp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSmtpList.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(getSmtpList.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(getSmtpList.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(createNewSmtp.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(createNewSmtp.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(createNewSmtp.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(deleteSmtp.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(deleteSmtp.fulfilled, (state, action) => {
            state.loading = 'succeeded';
        });
        builder.addCase(deleteSmtp.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export default smtpSlice.reducer;
