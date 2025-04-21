import { axiosInstance } from "@/configs/axios.config";
import { API } from "@/configs/env.config";
import Cookies from "js-cookie";
import { LoginReq } from "./types";
class musicService {
  // biểu dồ
  static getGenreStats(params?: any) {
    return axiosInstance.get("/genre/v1/get-genre-stats", {
      baseURL: API,
      params,
    });
  }
  // Auth
  static login(data: LoginReq) {
    return axiosInstance.post("/auth/v1/sign-in", data, {
      baseURL: API,
    });
  }
  static refreshToken() {
    return axiosInstance.post(
      "/refresh-token",
      {
        refreshToken: Cookies.get("refresh_token"),
      },
      {
        baseURL: API,
        hiddenToastError: true,
      }
    );
  }
  // user
  static getUsers(params: any) {
    return axiosInstance.get("/user/v1", {
      baseURL: API,
      params,
    });
  }
  static getArtists(params: any) {
    return axiosInstance.get("/artist/v1", {
      baseURL: API,
      params,
    });
  }

  static getUserDetail(id: string) {
    return axiosInstance.get(`/user/v1/${id}`, {
      baseURL: API,
    });
  }
  static updateUser(data: any) {
    return axiosInstance.post(`/user/v1/${data?.id}`, data, {
      baseURL: API,
    });
  }
  // genres
  static getGenres(params: any) {
    return axiosInstance.get("/genre/v1", {
      baseURL: API,
      params,
    });
  }
  static createGenre(data: any) {
    return axiosInstance.post("/genre/v1", data, {
      baseURL: API,
    });
  }
  static getGenreDetail(id: string) {
    return axiosInstance.get(`/genre/v1/${id}`, {
      baseURL: API,
    });
  }
  static deleteGenre(id: string) {
    return axiosInstance.delete(`/genre/v1/${id}`, {
      baseURL: API,
    });
  }
  static updateGenre(data: any) {
    return axiosInstance.post(`/genre/v1/${data?.id}`, data, {
      baseURL: API,
    });
  }
  // ablum
  static getAlbums(params: any) {
    return axiosInstance.get("/album/v1", {
      baseURL: API,
      params,
    });
  }
  static createAlbum(data: any) {
    return axiosInstance.post("/album/v1", data, {
      baseURL: API,
    });
  }
  static getAlbumDetail(id: string) {
    return axiosInstance.get(`/album/v1/${id}`, {
      baseURL: API,
    });
  }
  static deleteAlbum(id: string) {
    return axiosInstance.delete(`/album/v1/${id}`, {
      baseURL: API,
    });
  }
  static updateAlbum(data: any) {
    return axiosInstance.post(`/album/v1/${data?.id}`, data, {
      baseURL: API,
    });
  }

  // SONGS
  static getSongs(params: any) {
    return axiosInstance.get("/song/v1", {
      baseURL: API,
      params,
    });
  }
  static getListenCounts(params?: any) {
    return axiosInstance.get("/song/v1/listen-count", {
      baseURL: API,
      params,
    });
  }
  static createSong(data: any) {
    return axiosInstance.post("/song/v1", data, {
      baseURL: API,
    });
  }
  static getSongDetail(id: string) {
    return axiosInstance.get(`/song/v1/${id}`, {
      baseURL: API,
    });
  }
  static deleteSong(id: string) {
    return axiosInstance.delete(`/song/v1/${id}`, {
      baseURL: API,
    });
  }
  static updateSong(data: any) {
    return axiosInstance.post(`/song/v1/${data?.id}`, data, {
      baseURL: API,
    });
  }
  // playlist
  static getPlaylists(params: any) {
    return axiosInstance.get("/play-list/v1/get-all", {
      baseURL: API,
      params,
    });
  }
  static createPlaylist(data: any) {
    return axiosInstance.post("/play-list/v1", data, {
      baseURL: API,
    });
  }
  static getPlaylistDetail(id: string) {
    return axiosInstance.get(`/play-list/v1/${id}`, {
      baseURL: API,
    });
  }
  static deletePlaylist(id: string) {
    return axiosInstance.delete(`/play-list/v1/${id}`, {
      baseURL: API,
    });
  }
  static updatePlaylist(data: any) {
    return axiosInstance.post(`/play-list/v1/${data?.id}`, data, {
      baseURL: API,
    });
  }
  // Lịch sử nghe
  static getUserHistories(params: any) {
    return axiosInstance.get("/user-history/v1/get-all", {
      baseURL: API,
      params,
    });
  }
  static getTotalCount(params: any) {
    return axiosInstance.get("/dashboard/v1/total-count", {
      baseURL: API,
      params,
    });
  }
  static getTrendingSongs(params: any) {
    return axiosInstance.get("/song/v1/get-trending", {
      baseURL: API,
      params,
    });
  }
}

export default musicService;
