import colors from "./colors";
import {StyleSheet} from 'react-native'
import ApplicationStyles from "./ApplicationStyles";
import {fontFamily, fontSize} from "./const";

export default StyleSheet.create({
    ...ApplicationStyles,
    body: {
        flex: 1,
        backgroundColor: colors.bgRoot,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 100,
        maxHeight: 5000
    },

    textTitle: {
        fontSize: fontSize.medium,
        color: colors.charcoalGrey,
        fontFamily: fontFamily.demiBold,
        marginTop: 10,
        marginBottom: 5
    },
    textInputTitle: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 5,
        fontSize: fontSize.medium,
        color: colors.boldGrey,
        fontFamily: fontFamily.regular,
        padding: 10,
        marginBottom: 10,
    },
    textInputContent: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 5,
        minHeight: 100,
        textAlignVertical: 'top',
        fontSize: fontSize.medium,
        color: colors.boldGrey,
        fontFamily: fontFamily.regular,
        padding: 10,
    },
    img: {
        width: '95%',
        height: 150,
        resizeMode: 'contain'
    },
    plusButton: {
        fontSize: 28,
        fontWeight: "400",
      },

})
