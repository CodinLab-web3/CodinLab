import { useRouter } from 'next/router'
import Metadata from 'src/views/metadata';

const MetadataPage = () => {
    const router = useRouter();
    const language = router.query.language;
    return <Metadata language={language}/>;
}
 
MetadataPage.acl = {
  action: "read",
  permission: "profile",
};

export default MetadataPage;