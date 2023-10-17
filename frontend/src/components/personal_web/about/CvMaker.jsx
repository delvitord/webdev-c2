import React, { useState, useEffect } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import axios from "axios";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

const CV = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Nama: {data.nama}</Text>
          <Text style={styles.text}>Tempat Lahir: {data.tempat_lahir}</Text>
          <Text style={styles.text}>Tanggal Lahir: {data.tanggal_lahir}</Text>
          <Text style={styles.text}>Alamat: {data.alamat}</Text>
          <Text style={styles.text}>Email: {data.email}</Text>
          <Text style={styles.text}>No Telp: {data.no_telp}</Text>
          <Image src={data.foto} style={styles.image} />
          <Text style={styles.text}>Deskripsi: {data.deskripsi}</Text>
          <Text style={styles.text}>LinkedIn: {data.linkedin}</Text>
          <Text style={styles.text}>Instagram: {data.instagram}</Text>
          <Text style={styles.text}>X: {data.x}</Text>
          <Text style={styles.text}>GitHub: {data.github}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Organisasi</Text>
          {data.organisasi.map((org, index) => (
            <View key={index}>
              <Text style={styles.text}>- {org.nama_organisasi}</Text>
              <Text style={styles.text}> Jabatan: {org.jabatan}</Text>
              <Text style={styles.text}>
                {" "}
                Periode: {org.awal_periode} - {org.akhir_periode}
              </Text>
              <Text style={styles.text}> Deskripsi: {org.deskripsi}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Pendidikan</Text>
          {data.pendidikan.map((edu, index) => (
            <View key={index}>
              <Text style={styles.text}>- {edu.nama_instansi}</Text>
              <Text style={styles.text}> Jurusan: {edu.jurusan}</Text>
              <Text style={styles.text}>
                {" "}
                Periode: {edu.awal_periode} - {edu.akhir_periode}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Portofolio</Text>
          {data.portofolios.map((portfolio, index) => (
            <View key={index}>
              <Text style={styles.text}>- {portfolio.judul}</Text>
              <Text style={styles.text}> Deskripsi: {portfolio.deskripsi}</Text>
              <Text style={styles.text}> File: {portfolio.file}</Text>
              <Text style={styles.text}> Link: {portfolio.link}</Text>
              {portfolio.image.map((image, imgIndex) => (
                <Image src={image} style={styles.image} key={imgIndex} />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skill</Text>
          {data.skills.map((skill, index) => (
            <View key={index}>
              <Text style={styles.text}>- {skill.nama_skill}</Text>
              <Text style={styles.text}>
                {" "}
                Level Keahlian: {skill.level_keahlian}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const Cv = () => {
  const [datadiris, setDatadiri] = useState([]);
  const [organisasi, setOrganisasi] = useState([]);
  const [pendidikan, setPendidikan] = useState([]);
  const [portofolios, setPortofolio] = useState([]);
  const [skills, setSkill] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    getDatadiri();
    getOrganisasi();
    getPendidikan();
    getPortofolio();
    getSkill();
  }, []);

  const getDatadiri = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data_diri", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Format data sesuai dengan struktur yang telah Anda tentukan
      const dataWithId = response.data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));

      setDatadiri(dataWithId);
    } catch (error) {
      console.error("Error fetching data diri:", error);
    }
  };

  const getOrganisasi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/data_diri/organisasi",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setOrganisasi(response.data);
    } catch (error) {
      console.error("Error fetching organisasi data:", error);
    }
  };

  const getPendidikan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/data_diri/pendidikan",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPendidikan(response.data);
    } catch (error) {
      console.error("Error fetching pendidikan data:", error);
    }
  };

  const getPortofolio = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/data_diri/portofolio",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPortofolio(response.data);
    } catch (error) {
      console.error("Error fetching portofolio data:", error);
    }
  };

  const getSkill = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/data_diri/skill",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSkill(response.data);
    } catch (error) {
      console.error("Error fetching skill data:", error);
    }
  };

  return (
    <div>
      <CV
        data={{
          ...datadiris[0],
          organisasi,
          pendidikan,
          portofolios,
          skills,
        }}
      />
      <PDFDownloadLink
        document={
          <CV
            data={{
              ...datadiris[0],
              organisasi,
              pendidikan,
              portofolios,
              skills,
            }}
          />
        }
        fileName="cv.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Cv;
