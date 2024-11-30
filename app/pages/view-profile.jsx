import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import fonts from "../../constants/fonts";
import home from "../../assets/home.png"
import { FontAwesome } from '@expo/vector-icons';
import Svgs from "../../constants/svgs";
// import {getDesignerShowcaseById} from '../../src/api/repositories/designerShowCaseRepositoryById'
import { getDesignerShowcaseById, getDesignerShowcases } from "../../src/api/repositories/designerShowCaseRepository"


const Profile = () => {
  // const params = useLocalSearchParams(); // Retrieve passed data from navigation
  // const {
  //   name,
  //   image,
  //   rating,
  //   location,
  //   company,
  //   date,
  //   skills,
  //   experience = {},
  //   education = [],
  // } = params;

  // const designerData = getDesignerShowcases();

  const [activeTab, setActiveTab] = useState("About");
  const tabs = ["About", "Reviews", "Portfolio"];

  const [showcases, setShowcases] = useState([]);

  useEffect(() => {
    // Fetch designer showcases on component mount
    const fetchDesignerShowcases = async () => {
      try {
        const response = await getDesignerShowcaseById(8);
       // const response = await getDesignerShowcases();
        // setShowcases(response.data.data); // Adjust based on your API response structure
        // console.log(response.data.data)
      } catch (error) {
        // console.error("Error fetching designer showcases:", error);
      }
    };

    fetchDesignerShowcases();
  }, []);

  // const {item_name, id, desc} = showcases
  // console.log(showcases)
  // console.log(showcases[0])

  // useEffect(() => {
  //   console.log("Params:", params);
  //   console.log("Skills:", skills);
  // }, [params, skills]);

  const review = [{
    id: '1',
    name: 'Kristin Watson',
    countryFlag: '🚩',
    verified: true,
    reviewText: "this is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it's so smooth from the scrub & mask ~ This is perfection ~ Smells just like honey 🍯 & the packaging is so adorable ~ I'm so very happy with this product 🐻🍯 ~",
    rating: 5,
  },
  {
    id: '2',
    name: 'Kristin Watson',
    countryFlag: '🏳️',
    verified: true,
    reviewText: "this is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it's so smooth from the scrub & mask ~ This is perfection ~ Smells just like honey 🍯 & the packaging is so adorable ~ I'm so very happy with this product 🐻🍯 ~",
    rating: 3,
  },
  {
    id: '3',
    name: 'Kristin Watson',
    countryFlag: '🏴',
    verified: true,
    reviewText: "this is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it's so smooth from the scrub & mask ~ This is perfection ~ Smells just like honey 🍯 & the packaging is so adorable ~ I'm so very happy with this product 🐻🍯 ~",
    rating: 1,
  }
  ]


  const RatingBar = ({ label, percentage }) => {
    return (
      <View style={styles.ratingBarContainer}>
        <Text style={styles.ratingLabel}>{label}</Text>
        <View style={styles.ratingBarWrapper}>
          <View style={[styles.ratingFilledBar, { width: `${percentage}%` }]} />
          <View style={styles.ratingEmptyBar} />
        </View>
      </View>
    );
  };



  const renderTabContent = () => {
    const renderStars = (rating) => {
      return (
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome
              key={i}
              name={i < rating ? 'star' : 'star-o'}
              size={20}
              color="#FFB400"
              style={styles.star}
            />
          ))}
        </View>
      );
    };

    const renderReview = ({ item }) => (
      <View style={styles.reviewContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {item.name} <Text style={styles.flag}>{item.countryFlag}</Text>
          </Text>
          <View style={styles.rating}>
            <Text style={styles.verifiedText}>{item.verified ? 'Verified Buyer' : ''}</Text>
            <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
          </View>
        </View>
        <Text style={styles.reviewText}>{item.reviewText}</Text>
      </View>
    );


    switch (activeTab) {
      case "About":
        return (
          <View style={styles.tabContent}>
            {/* <Text style={styles.aboutTitle}>About {name?.split(" ")[0]}</Text>
            <Text style={styles.aboutDescription}>
              I'm a fashion designer based in {location}. I have been working in
              the fashion industry for {experience?.years} years.
            </Text> */}
            <View style={styles.infoContainer}>
              {/* {location && (
                <View style={styles.infoItem}>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/ios-filled/50/4caf50/place-marker.png",
                    }}
                    style={styles.icon}
                  />
                  <Text style={styles.infoText}>{location}</Text>
                </View>
              )} */}
              {/* {company && (
                <View style={styles.infoItem}>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/ios-filled/50/4caf50/organization.png",
                    }}
                    style={styles.icon}
                  />
                  <Text style={styles.infoText}>{company}</Text>

                </View>

              )} */}

              <View style={styles.infoItem}>
                <Image source={home} style={styles.image} />
                <Text style={styles.infoText}>date</Text>
              </View>

              {/* {date && (
                <View style={styles.infoDate}>
                  <Image source={home} />
                  <Text style={styles.infoText}>{date}</Text>
                </View>

              )} */}
            </View>

            <View style={styles.skillsSection}>
              <Text style={styles.skillsTitle}>Skills</Text>
              <View style={styles.skillsList}>
                <TouchableOpacity style={styles.skillItem}>
                  <Text style={styles.skillText}>Fashion design</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skillItem}>
                  <Text style={styles.skillText}>Illustration</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skillItem}>
                  <Text style={styles.skillText}>Pattern making</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skillItem}>
                  <Text style={styles.skillText}>Sewing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skillItem}>
                  <Text style={styles.skillText}>Tech packs</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.experienceContainer}>
              {/* Experience Title */}
              <Text style={styles.experienceTitle}>Experience</Text>

              {/* Designer Experience */}
              <View style={styles.experienceItem}>
                <Text style={styles.experienceRole}>Designer</Text>
                <Text style={styles.experiencePeriod}>2006 - 2010</Text>
                <Text style={styles.experienceCompany}>Marc Jacobs</Text>
              </View>

              {/* Senior Designer Experience */}
              <View style={styles.experienceItem}>
                <Text style={styles.experienceRole}>Senior Designer</Text>
                <Text style={styles.experiencePeriod}>2010 - Present</Text>
                <Text style={styles.experienceCompany}>Chloe Design</Text>
              </View>
            </View>

            <View style={styles.educationContainer}>
              {/* Education Title */}
              <Text style={styles.educationTitle}>Education</Text>

              {/* BFA Fashion Design */}
              <View style={styles.educationItem}>
                <Text style={styles.educationDegree}>BFA Fashion Design</Text>
                <Text style={styles.educationPeriod}>2002 - 2006</Text>
                <Text style={styles.educationInstitution}>Parsons School of Design</Text>
              </View>
            </View>
          </View>
        );
      case "Reviews":
        return (


          <>
            <View style={styles.ratingContainer}>
              {/* Rating Bars */}
              <View style={styles.ratingBars}>
                <RatingBar label="5" percentage={100} />
                <RatingBar label="4" percentage={70} />
                <RatingBar label="3" percentage={50} />
                <RatingBar label="2" percentage={30} />
                <RatingBar label="1" percentage={15} />
              </View>

              {/* Overall Rating */}
              <View style={styles.overallRatingContainer}>
                <View style={styles.overallstar}>
                <Text style={styles.overallRatingNumber}>4.5</Text>
                <Text style={styles.overallRatingStar}>★</Text>
                </View>
                <Text style={styles.ratingReviewCount}>273 Reviews</Text>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.sortContainer}>
                <Text style={styles.sortedBy}>Sorted by</Text>
                <View style={styles.sort1}>
                  <Svgs.sort1 />
                </View>
                <TouchableOpacity style={styles.sortButton}>
                  <Text style={styles.sortButtonText}>Sort</Text>
                  <Svgs.arrow />
                </TouchableOpacity>
              </View>
              
             
              <View>
                {review.map((item)=>(
                  <View key={item.id}>
                    {renderReview({item})}
                    </View>
                ))}
              </View>
            </View>

          </>


        );

      case "Portfolio":
        return (
          <ScrollView style={styles.portfolioContainer}>
            <Text style={styles.portfolioHeading}>
              These are some of the projects Pamela did so you can get a better
              understanding of their experience.
            </Text>
            <View style={styles.portfolioProjects}>
              <View style={styles.portfolioCard}>
                <Image
                  source={Svgs.pic1}
                  style={styles.portfolioImage}
                />
                <Text style={styles.portfolioText}>NBA G League IGNITE TEAM</Text>
              </View>
              <View style={styles.portfolioCard}>
                <Image
                  source={Svgs.pic2}
                  style={styles.portfolioImage}
                />
                <Text style={styles.portfolioText}>NBA G League IGNITE TEAM</Text>
              </View>
              <View style={styles.portfolioCard}>
                <Image
                  source={Svgs.pic3}
                  style={styles.portfolioImage}
                />
                <Text style={styles.portfolioText}>NBA G League</Text>
              </View>
              <View style={styles.portfolioCard}>
                <Image
                  source={Svgs.pic4}
                  style={styles.portfolioImage}
                />
                <Text style={styles.portfolioText}>NBA G League</Text>
              </View>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          {/* {image && (
            <Image
              source={{ uri: image }}
              style={styles.profileImage}
            />
          )} */}
          <Text style={styles.profileName}>{name}</Text>
          {/* {location && (
            <Text style={styles.profileLocation}>
              Fashion Designer in {location}
            </Text>
          )} */}
          {/* {rating && (
            <Text style={styles.profileRating}>{rating} followers</Text>
          )} */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.buttonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab ? styles.activeTab : null,
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "Portfolio" && (
          <ScrollView style={styles.portfolioContainer}>
            {showcases.map((showcase) => (
              <View key={showcase.id} style={styles.portfolioCard}>
                <Image source={{ uri: showcase.image }} style={styles.portfolioImage} />
                <Text style={styles.portfolioText}>{showcase.title}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profileHeader: {
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 16,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileLocation: {
    color: '#8FFA09', // Replace with your primary color
    fontSize: 16,
  },
  profileRating: {
    color: '#8FFA09', // Replace with your primary color
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  followButton: {
    backgroundColor: '#8FFA09', // Replace with your primary color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 8,
  },
  contactButton: {
    backgroundColor: '#808080', // Replace with your gray color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  buttonText: {
    color: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  tab: {
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8FFA09', // Replace with your primary color
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#8FFA09', // Replace with your primary color
  },
  inactiveTabText: {
    color: '#808080', // Replace with your gray color
  },
  tabContent: {
    padding: 16,
  },
  aboutTitle: {
    color: '#8FFA09', // Replace with your primary color
    fontSize: 20,
    fontWeight: 'bold',
  },
  aboutDescription: {
    color: '#a9a9a9',
    marginTop: 8,
  },
  infoContainer: {
    marginTop: 16,
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  infoText: {
    color: '#a9a9a9',
  },
  image: {
    marginRight: 10,
    height: 18,
    width: 17

  },
  skillsSection: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#000',  // Background color similar to the image
    marginTop:20,
  },
  skillsTitle: {
    fontSize: 20,
    color: '#8FFA09',  // Same green color for "Skills" heading
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: -5,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillItem: {
    backgroundColor: '#1a1a1a', // Dark background similar to the image
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#555',
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    minWidth: 130,  // Width to make the buttons even
    alignItems: 'center',
  },
  skillText: {
    color: '#fff',
    fontSize: 16,
  },
  experienceContainer: {
    padding: 5,
    backgroundColor: '#000', // Black background
    flex: 1,
  },
  experienceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8FFA09', // Green color
    marginBottom: 20,
    marginLeft: -10,
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceRole: {
    fontSize: 16,
    color: '#404145', // Light gray color for role
    marginBottom: 5,
  },
  experiencePeriod: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Yellowish color for time period
    marginBottom: 5,
  },
  experienceCompany: {
    fontSize: 18,
    color: '#fff', // Same yellowish color for company name
  },
  educationContainer: {
    padding: 5,
    backgroundColor: '#000', // Black background
    flex: 1,
  },
  educationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8FFA09', // Green color
    marginBottom: 20,
    marginLeft: -10,
  },
  educationItem: {
    marginBottom: 20,
  },
  educationDegree: {
    fontSize: 16,
    color: '#404145', // Light gray color for degree
    marginBottom: 5,
  },
  educationPeriod: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Yellowish color for time period
    marginBottom: 5,
  },
  educationInstitution: {
    fontSize: 18,
    color: '#fff', // Same yellowish color for institution name
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000', // Black background
  },
  ratingBars: {
    flex: 1,
    marginRight: 20,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingLabel: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  ratingBarWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 10,
    backgroundColor: '#333', // Background for empty bar
    borderRadius: 5,
    overflow: 'hidden',
  },
  ratingFilledBar: {
    backgroundColor: '#8FFA09', // Green bar
    height: '100%',
  },
  ratingEmptyBar: {
    flex: 1,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 6,  // Gap between stars
  },
  overallRatingContainer: {
    alignItems: 'center',
  },
  overallRatingNumber: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  overallRatingStar: {
    color: '#8FFA09', // Star color
    fontSize: 26,
  },
  overallstar:{
    flexDirection: 'row',
    paddingTop:30,

  },
  ratingReviewCount: {
    color: '#ccc', // Gray for review text
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#000', // For dark mode feel
    padding: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sortedBy: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 5,
  },
  sort1: {
    marginLeft: 120,
  },
  sortButton: {
    backgroundColor: '#8FFA09',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#000',
    fontSize: 16,
  },
  reviewContainer: {
    // backgroundColor: '#1c1c1c',
    // borderRadius: 10,
    padding: 5,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 10,
    gap: 5,

  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flag: {
    fontSize: 16,
  },
  verifiedText: {
    color: '#8FFA09',
    fontSize: 14,
  },
  reviewText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
   portfolioContainer: {
    flex: 1,
    padding: 4,
    backgroundColor: '#000',
  },
  portfolioHeading: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 16,
    fontFamily: fonts["Poppins-Regular"]
  },
  portfolioProjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  portfolioCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  portfolioImage: {
    width: '100%',
    height: 191,
    resizeMode: 'cover',
  },
  portfolioText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    padding: 8,
    fontFamily: fonts["Poppins-Medium"]
  },

});


export default Profile;
