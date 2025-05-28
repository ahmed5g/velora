package com.tech.Velora.listing.domain;

import com.tech.Velora.sharedkernel.doamin.AbstractAuditingEntity;
import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "lisiting_picture")
public class ListingPicture extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "listingPictureSequenceGenerator")
    @SequenceGenerator(name = "listingPictureSequenceGenerator", sequenceName = "listingPicture_generator", allocationSize = 1)
    @Column(name = "id")
    private Long id;


    @ManyToOne
    @JoinColumn(name = "listing_fk", referencedColumnName = "id")
    private Listing listing;

    @Lob
    @Column(name = "file", nullable = false)
    private Byte[] file;

    @Column(name = "file_content_type")
    private String fileContentType;
    @Column(name = "cover")
    private boolean isCover;

    @Override
    public Long getId () {
        return id;
    }

    public void setId (Long id) {
        this.id = id;
    }

    public Listing getListing () {
        return listing;
    }

    public void setListing (Listing listing) {
        this.listing = listing;
    }

    public Byte[] getFile () {
        return file;
    }

    public void setFile (Byte[] file) {
        this.file = file;
    }

    public String getFileContentType () {
        return fileContentType;
    }

    public void setFileContentType (String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public boolean isCover () {
        return isCover;
    }

    public void setCover (boolean cover) {
        isCover = cover;
    }

    @Override
    public boolean equals (Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListingPicture that = (ListingPicture) o;
        return isCover == that.isCover && Arrays.equals(file, that.file) && Objects.equals(fileContentType, that.fileContentType);
    }

    @Override
    public int hashCode () {
        int result = Objects.hash(fileContentType, isCover);
        result = 31 * result + Arrays.hashCode(file);
        return result;
    }

    @Override
    public String toString () {
        return "ListingPicture{" +
                "id=" + id +
                ", listing=" + listing +
                ", file=" + Arrays.toString(file) +
                ", fileContentType='" + fileContentType + '\'' +
                ", isCover=" + isCover +
                '}';
    }
}
