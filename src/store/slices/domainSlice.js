import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/IHOST-backend/domains';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// ─── Existing thunks ────────────────────────────────────────────────────────
export const fetchDomains = createAsyncThunk('domains/fetch', async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(userId ? `${API_URL}/user/${userId}` : API_URL, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const registerDomain = createAsyncThunk('domains/register', async (domainData, { rejectWithValue }) => {
    try {
        const res = await axios.post(API_URL, domainData, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const checkDomainAvailability = createAsyncThunk('domains/check', async (domainName, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/check/${domainName}`, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

// ─── New management thunks ───────────────────────────────────────────────────
export const renewDomain = createAsyncThunk('domains/renew', async (idDomaine, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${API_URL}/renew/${idDomaine}`, {}, authHeader());
        return { idDomaine, newExpiry: res.data.newExpiry };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const toggleAutoRenew = createAsyncThunk('domains/toggleAutoRenew', async (idDomaine, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${API_URL}/toggle-autorenew/${idDomaine}`, {}, authHeader());
        return { idDomaine, auto_renew: res.data.auto_renew };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const toggleDomainLock = createAsyncThunk('domains/toggleLock', async (idDomaine, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${API_URL}/toggle-lock/${idDomaine}`, {}, authHeader());
        return { idDomaine, is_locked: res.data.is_locked };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const toggleWhoisPrivacy = createAsyncThunk('domains/togglePrivacy', async (idDomaine, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${API_URL}/toggle-privacy/${idDomaine}`, {}, authHeader());
        return { idDomaine, whois_privacy: res.data.whois_privacy };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const transferDomain = createAsyncThunk('domains/transfer', async ({ idDomaine, eppCode }, { rejectWithValue }) => {
    try {
        await axios.put(`${API_URL}/transfer/${idDomaine}`, { eppCode }, authHeader());
        return { idDomaine };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const fetchDnsRecords = createAsyncThunk('domains/fetchDns', async (idDomaine, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/dns/${idDomaine}`, authHeader());
        return { idDomaine, records: res.data.data };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const addDnsRecord = createAsyncThunk('domains/addDns', async ({ idDomaine, type, name, value, priority, ttl }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/dns/${idDomaine}`, { type, name, value, priority, ttl }, authHeader());
        return { idDomaine, record: { idRecord: res.data.id, domaineId: idDomaine, type, name, value, priority, ttl } };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const updateDnsRecord = createAsyncThunk('domains/updateDns', async ({ idRecord, idDomaine, name, value, priority, ttl }, { rejectWithValue }) => {
    try {
        await axios.put(`${API_URL}/dns/record/${idRecord}`, { name, value, priority, ttl }, authHeader());
        return { idRecord, idDomaine, name, value, priority, ttl };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const deleteDnsRecord = createAsyncThunk('domains/deleteDns', async ({ idRecord, idDomaine }, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/dns/record/${idRecord}`, authHeader());
        return { idRecord, idDomaine };
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

// ─── Slice ───────────────────────────────────────────────────────────────────
const domainSlice = createSlice({
    name: 'domains',
    initialState: {
        items: [],
        dnsRecords: {},
        availabilityCheck: null,
        isLoading: false,
        error: null
    },
    reducers: {
        resetAvailability: (state) => {
            state.availabilityCheck = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDomains.pending,   (state) => { state.isLoading = true; })
            .addCase(fetchDomains.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchDomains.rejected,  (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            .addCase(checkDomainAvailability.pending,   (state) => { state.isLoading = true; })
            .addCase(checkDomainAvailability.fulfilled, (state, action) => {
                state.isLoading = false;
                state.availabilityCheck = action.payload;
            })
            .addCase(checkDomainAvailability.rejected,  (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            .addCase(renewDomain.fulfilled, (state, action) => {
                const dom = state.items.find(d => d.idDomaine === action.payload.idDomaine);
                if (dom) { dom.expirationDate = action.payload.newExpiry; dom.statusDomaine = 'active'; }
            })
            .addCase(toggleAutoRenew.fulfilled, (state, action) => {
                const dom = state.items.find(d => d.idDomaine === action.payload.idDomaine);
                if (dom) dom.auto_renew = action.payload.auto_renew;
            })
            .addCase(toggleDomainLock.fulfilled, (state, action) => {
                const dom = state.items.find(d => d.idDomaine === action.payload.idDomaine);
                if (dom) dom.is_locked = action.payload.is_locked;
            })
            .addCase(toggleWhoisPrivacy.fulfilled, (state, action) => {
                const dom = state.items.find(d => d.idDomaine === action.payload.idDomaine);
                if (dom) dom.whois_privacy = action.payload.whois_privacy;
            })
            .addCase(transferDomain.fulfilled, (state, action) => {
                const dom = state.items.find(d => d.idDomaine === action.payload.idDomaine);
                if (dom) dom.statusDomaine = 'expired';
            })
            .addCase(fetchDnsRecords.pending, (state, action) => {
                const id = action.meta.arg;
                if (!state.dnsRecords[id]) state.dnsRecords[id] = { records: [], isLoading: true };
                else state.dnsRecords[id].isLoading = true;
            })
            .addCase(fetchDnsRecords.fulfilled, (state, action) => {
                const { idDomaine, records } = action.payload;
                state.dnsRecords[idDomaine] = { records, isLoading: false };
            })
            .addCase(fetchDnsRecords.rejected, (state, action) => {
                const id = action.meta.arg;
                if (state.dnsRecords[id]) state.dnsRecords[id].isLoading = false;
            })
            .addCase(addDnsRecord.fulfilled, (state, action) => {
                const { idDomaine, record } = action.payload;
                if (!state.dnsRecords[idDomaine]) state.dnsRecords[idDomaine] = { records: [], isLoading: false };
                state.dnsRecords[idDomaine].records.push(record);
            })
            .addCase(updateDnsRecord.fulfilled, (state, action) => {
                const { idRecord, idDomaine, name, value, priority, ttl } = action.payload;
                const bucket = state.dnsRecords[idDomaine];
                if (bucket) {
                    const rec = bucket.records.find(r => r.idRecord === idRecord);
                    if (rec) Object.assign(rec, { name, value, priority, ttl });
                }
            })
            .addCase(deleteDnsRecord.fulfilled, (state, action) => {
                const { idRecord, idDomaine } = action.payload;
                const bucket = state.dnsRecords[idDomaine];
                if (bucket) bucket.records = bucket.records.filter(r => r.idRecord !== idRecord);
            });
    }
});

export const { resetAvailability } = domainSlice.actions;
export default domainSlice.reducer;
